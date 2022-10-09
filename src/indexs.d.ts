/*
 * @Descripttion: 
 * @version: 
 * @Author: houqiangxie
 * @Date: 2022-10-09 14:38:04
 * @LastEditors: houqiangxie
 * @LastEditTime: 2022-10-09 14:40:39
 */
import { StorageInterface, StorageConfig, StorageType } from "./types";
export declare const useStorage: (namespace?: string | false) => StorageInterface;
export { StorageConfig, StorageType };