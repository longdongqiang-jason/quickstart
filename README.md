## ⚙️ iStoreOS QuickStart 界面调整

修改文件：

```text
luci-app-quickstart/htdocs/luci-static/quickstart/index.js
```

### ① 系统维护

找到删除：

```php
t("div",{class:"item",style:{backgroundColor:"#eff5ff"},onClick:y},[Y(fa,{color:"#553afe",class:"icon"}),t("span",null,i(e(n)("\u7CFB\u7EDF\u7EF4\u62A4")),1)])
```
将：

```javascript
/cgi-bin/luci/admin/store/pages/maintance
```
修改为：
```javascript
/cgi-bin/luci/admin/system/flash
```
---

### ② 应用商店

找到删除：

```less
{icon:"appStore",title:n("\u5E94\u7528\u5546\u5E97"),subtitle:n("\u767E\u6B3E\u5E94\u7528\uFF0C\u81EA\u7531\u9009\u62E9"),status:"",color:"orange",alink:"/cgi-bin/luci/admin/store/pages/store"}
```
---

### ③ iStoreOS 官网

找到删除：

```less
t("a",Xb,i(e(n)("iStoreOS\u5B98\u7F51")),1)
```

```javascript
iStoreOS\u5B98\u7F51
```
修改为：
```javascript
\u5B98\u7F51
```

```javascript
https://www.istoreos.com/
```
修改为：
```javascript
https://github.com/huajiaoshu520/X86-daed/releases/latest
```
---

### ④ 调整模块位置

将：

```javascript
class:"model_btn"
```
修改为：
```javascript
class:"model_btn",style:{transform:"translateY(-40px)"}
```

```javascript
style:{"text-decoration":"none",color:"white","line-height":"1.5em"}}
```
修改为：

```javascript
style:{"text-decoration":"none",color:"white","line-height":"1.5em","transform": "translateY(-42px)"}}
```
> 用于将对应模块整体向上移动 `40px`。

---

### ⑤ 模块显示设置

根据需要关闭不使用的模块。

#### 快捷入口

原配置：

```yaml
quickActions:!0,
```

修改为：

```yaml
quickActions:!1,
```

#### 存储服务

原配置：

```yaml
storage:!0,
```

修改为：

```yaml
storage:!1,
```

#### 下载服务

原配置：

```yaml
downloadService:!0,
```

修改为：

```yaml
downloadService:!1,
```

#### 远程域名

原配置：

```yaml
remoteDomain:!0,
```

修改为：

```yaml
remoteDomain:!1,
```

### 📌 配置说明

| 配置项 | `!0` | `!1` |
|---|---|---|
| `quickActions` | 开启快捷入口 | 关闭快捷入口 |
| `storage` | 开启存储服务 | 关闭存储服务 |
| `downloadService` | 开启下载服务 | 关闭下载服务 |
| `remoteDomain` | 开启远程域名 | 关闭远程域名 |

> **提示：** 修改完成后，根据项目实际构建方式重新编译/刷新 LuCI 前端资源即可生效。
