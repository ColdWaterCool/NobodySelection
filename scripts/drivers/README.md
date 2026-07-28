# DBeaver MySQL 驱动（本地离线包）

当 DBeaver 无法从 Maven Central 下载驱动时（国内网络常见 `Forbidden`），使用本目录中的 jar。

| 文件 | 说明 |
|------|------|
| `mysql-connector-j-8.2.0.jar` | MySQL JDBC 驱动（约 2.4MB） |

来源：阿里云 Maven 镜像 `maven.aliyun.com`

## 手动指定驱动（DBeaver 界面）

1. **Database → Driver Manager**
2. 选择 **MySQL** → **Edit**
3. **Libraries** 标签 → **Add File**
4. 选择本目录的 `mysql-connector-j-8.2.0.jar`
5. 删除或忽略下载失败的 Maven 条目
6. **OK** 保存

## 自动配置

项目已配置 `scripts/open-dbeaver.bat`，驱动已写入 DBeaver 工作区配置，一般直接运行即可。
