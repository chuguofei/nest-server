## mongo

###

- Read：允许用户读取指定数据库
- readWrite：允许用户读写指定数据库
- dbAdmin：允许用户在指定数据库中执行管理函数，如索引创建、删除，查看统计或访问 system.profile
- userAdmin：允许用户向 system.users 集合写入，可以找指定数据库里创建、删除和管理用户
- clusterAdmin：只在 admin 数据库中可用，赋予用户所有分片和复制集相关函数的管理权限。
- readAnyDatabase：只在 admin 数据库中可用，赋予用户所有数据库的读权限
- readWriteAnyDatabase：只在 admin 数据库中可用，赋予用户所有数据库的读写权限
- userAdminAnyDatabase：只在 admin 数据库中可用，赋予用户所有数据库的 userAdmin 权限
- dbAdminAnyDatabase：只在 admin 数据库中可用，赋予用户所有数据库的 dbAdmin 权限。
- root：只在 admin 数据库中可用。超级账号，超级权限

### 安装

```sh
docker pull mongo

## 启动容器
docker run --name mongoDB -p 27017:27017 -d mongo --auth

## 创建一个用户 root 密码：123456 角色为 root, 数据库为 admin

db.createUser({user:'root',pwd: '123456' , roles:[{ role: 'root' ,db:'admin'}] })
```

### 链接选项

- Standalone（独立部署）:
  - 这是最简单的 MongoDB 部署方式，通常用于开发和测试环境，或者小型应用程序。
  - 单个 MongoDB 实例运行在一个服务器上，不与其他 MongoDB 实例连接。
  - 没有高可用性和扩展性的支持，因为只有一个单独的实例。
- Shard Cluster（分片集群）:

  -分片集群是用于处理大规模数据和高吞吐量的 MongoDB 部署选项。 -数据被分成多个片段（shards），每个片段存储在不同的服务器上。 -分片集群提供了水平扩展性，允许处理大量数据，并且提高了读写操作的性能。

- Replica Set（副本集）:

  - 副本集是用于提供高可用性和数据冗余的 MongoDB 部署选项。
  - 一个副本集包含一个主节点和多个从节点。

  - 主节点处理所有写操作，从节点复制主节点的数据，并可以提供读操作的负载均衡和故障恢复。
  - 如果主节点发生故障，系统会自动选举新的主节点。
