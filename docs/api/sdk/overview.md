# Overview 
## *1.* types/product_event

### *1.1* product_event.proto

Gravity's event relationship settings, under Protobuf format

```
enum Method {
  INSERT = 0;
  UPDATE = 1;
  DELETE = 2;
  TRUNCATE = 3;
}

message ProductEvent {
  string eventName = 1;
  string table = 2;
  Method method = 3;
  repeated string primaryKeys = 4;
  bytes primaryKey = 5;
  bytes data = 6;
}
```
| Item        | Description                                                   |
| ----------- | ------------------------------------------------------        |
| eventName   | Defined event name                                            |
| table       | Selected Table                                                |
| Method      | Trigger condition, e.g., `INSERT` `UPDATE` `DELETE` `TRUNCATE`|
| primaryKeys | Primary Keys (repeated string)                                | 
| primaryKey  | Primary Key (bytes)                                           |
| data        | data in bytes (compton.Record)                                |

### *1.2* product_event.go

Provides `Marshal`\ `Unmarshal` method in relation to Product Event. Other than native Protobuf support, accessing its content require `ProductEvent.Data`. 
See [compton records](https://github.com/BrobridgeOrg/compton/blob/main/types/record/record.proto) for more information.

> :memo: **Note:**
>
> `compton/types/record/record.proto` is in Key-Value format
>
> `google.protobuf.Struct` is a JSON Object

```
message Record {
  google.protobuf.Struct meta = 1;
  Value payload = 2;
}

message Value {
  DataType type = 1;
  bytes value = 2;
  MapValue map = 3;
  ArrayValue array = 4;
  google.protobuf.Timestamp timestamp = 5;
}

message MapValue {
  repeated Field fields = 1;
}

message ArrayValue {
  repeated Value elements = 1;
}

enum DataType {
  BOOLEAN = 0;
  BINARY = 1;
  STRING = 2;
  UINT64 = 3;
  INT64 = 4;
  FLOAT64 = 5;
  ARRAY = 6;
  MAP = 7;
  NULL = 8;
  TIME = 9;
}
```

## *2.* product

### *2.1* product.go

This object performs CRUD actions on `Product` as well as registration of `ProductClient`
```go
type ProductSetting struct {
	Name            string                 `json:"name"`
	Description     string                 `json:"desc"`
	Enabled         bool                   `json:"enabled"`
	Rules           map[string]*Rule       `json:"rules"`
	Schema          map[string]interface{} `json:"schema"`
	EnabledSnapshot bool                   `json:"enabledSnapshot"`
	Snapshot        *SnapshotSetting       `json:"snapshot"`
	Stream          string                 `json:"stream"`
	CreatedAt       time.Time              `json:"createdAt"`
	UpdatedAt       time.Time              `json:"updatedAt"`
}

type ProductClient struct {
	options     *Options
	client      *core.Client
	configStore *config_store.ConfigStore
}
```

### *2.2* rule.go

You may assign rules to data products.

```go
type Rule struct {
	ID            string                 `json:"id"`
	Name          string                 `json:"name"`
	Description   string                 `json:"desc"`
	Event         string                 `json:"event"`
	Product       string                 `json:"product"`
	Method        string                 `json:"method"`
	PrimaryKey    []string               `json:"primaryKey"`
	SchemaConfig  map[string]interface{} `json:"schema,omitempty"`
	HandlerConfig *HandlerConfig         `json:"handler,omitempty"`
	Enabled       bool                   `json:"enabled"`
	CreatedAt     time.Time              `json:"createdAt"`
	UpdatedAt     time.Time              `json:"updatedAt"`
}
```

## *3.* core

Defines NATs Client as well as access controls.

```go
var AvailablePermissions = Permissions{

	// Administrator
	"ADMIN": "Administrator",

	// Product
	"PRODUCT.LIST":          "List available products",
	"PRODUCT.CREATE":        "Create product",
	"PRODUCT.DELETE":        "Delete specific product",
	"PRODUCT.UPDATE":        "Update specific product",
	"PRODUCT.PURGE":         "Purge specific product",
	"PRODUCT.INFO":          "Get specific product information",
	"PRODUCT.SUBSCRIPTION":  "Subscribe to specific product",
	"PRODUCT.SNAPSHOT.READ": "Read snapshot of specific product",
	"PRODUCT.ACL":           "Update ACL of specific product",

	// Token
	"TOKEN.LIST":   "List available tokens",
	"TOKEN.CREATE": "Create token",
	"TOKEN.DELETE": "Delete specific token",
	"TOKEN.UPDATE": "Update specific token",
	"TOKEN.INFO":   "Get specific token information",
}

type AuthenticateRequest struct {
	Token string `json:"token"`
}

type AuthenticateReply struct {
	ErrorReply

	Durable     string   `json:"durable"`
	Permissions []string `json:"permissions"`
}
```

## *4.* Adapter

Adapter connects and receives message from data source.

### *4.1* adapter.go

```go
type AdapterConnector struct {
	id      string
	client  *core.Client
	js      nats.JetStreamContext
	options *Options
}

type Message struct {
	EventName string `json:"event"`
	Payload   []byte `json:"payload"`
}

type PubAckFuture interface {
	Ok() <-chan *nats.PubAck
	Err() <-chan error
	Msg() *nats.Msg
}
```

## *5.* Subscriber

Responsible for managing subscriptions and subscribers, allowing events to stream further down the road.

### *5.1* subscription.go

```go
type Subscription struct {
	subscriber          *Subscriber
	handler             func(*nats.Msg)
	domain              string
	productName         string
	startSequence       uint64
	enabledInitialLoad  bool
	partitions          []int
	nativeSubscriptions map[string]*nats.Subscription
	subOpts             []nats.SubOpt
}

func (sub *Subscription) Subscribe() error {

	// Subscribe to multiple partitions
	for _, p := range sub.partitions {

		var partition string
		if p == -1 {
			// All partitions
			partition = "*"
		} else {
			// Specific parition
			partition = fmt.Sprintf("%d", p)
		}

		subject := fmt.Sprintf(productEventSubject, sub.domain, sub.productName, partition)

		log.WithFields(logrus.Fields{
			"subject": subject,
		}).Info("Subscribing to subject")

		err := sub.subscribe(subject)
		if err != nil {
			return err
		}
	}

	return nil
}

```

## *6.* config_store

`config_store` *stores* config. It uses JetStream Key-Value APIs.

### *6.1* config_store.go

```go
type ConfigOp int32

const (
	ConfigCreate ConfigOp = iota
	ConfigUpdate
	ConfigDelete
)

var configOps = map[ConfigOp]string{
	ConfigCreate: "Create",
	ConfigUpdate: "Update",
	ConfigDelete: "Delete",
}

func (co ConfigOp) String() string {
	return configOps[co]
}

type ConfigEntry struct {
	Operation ConfigOp
	Key       string
	Value     []byte
	Revision  uint64
	Created   time.Time
	Delta     uint64
}

type ConfigStore struct {
	client       *core.Client
	domain       string
	catalog      string
	ttl          time.Duration
	watcher      nats.KeyWatcher
	eventHandler func(*ConfigEntry)
	kv           nats.KeyValue
}
```

## *7.* token

Manages tokens and other access controls.

### *7.1* token.go

```
type TokenSetting struct {
	ID          string                 `json:"id"`
	Description string                 `json:"desc"`
	Enabled     bool                   `json:"enabled"`
	Permissions map[string]*Permission `json:"permissions"`
	CreatedAt   time.Time              `json:"createdAt"`
	UpdatedAt   time.Time              `json:"updatedAt"`
}

type TokenClient struct {
	options     *Options
	client      *core.Client
	configStore *config_store.ConfigStore
}
```

