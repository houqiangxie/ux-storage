<!--
 * @Descripttion: 
 * @version: 
 * @Author: houqiangxie
 * @Date: 2022-10-09 16:42:35
 * @LastEditors: houqiangxie
 * @LastEditTime: 2022-10-09 16:47:22
-->
## 用法 
  # import { useStorage，createStorage,StorageType } from "vue3-storage";
  # createStorage({namespace:'pro',storage: StorageType.Local}) 设置命名空间及session或local
   # const storage = useStorage()
   # storage.setStorageSync('aa',data) 设置缓存
   # storage.getStorageSync('aa') 获取缓存