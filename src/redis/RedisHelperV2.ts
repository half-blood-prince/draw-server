import e from "express";
import redis, { RedisClient } from "redis";
import config from "../config";

class RedisHelper {
  redisClient: RedisClient;

  constructor() {
    console.log("Constructing RedisHelper V2");
    this.redisClient = redis.createClient(config.redisURL, { no_ready_check: true });
    this.redisClient.on("error", function (error) {
      console.error(error);
    });
  }

  setString(key: string, value: string): Promise<boolean> {
    return new Promise((resolve, reject: (error: Error) => void) => {
      this.redisClient.set(key, value, (err, reply) => {
        if (err == null) resolve(true);
        else reject(err);
      });
    });
  }

  getString(key: string) {
    return new Promise((resolve: (value: string | null) => void, reject: (error: Error) => void) => {
      this.redisClient.get(key, (err, reply) => {
        if (err == null) resolve(reply);
        else reject(err);
      });
    });
  }

  delete(key: string) {
    return new Promise((resolve, reject: (error: Error) => void) => {
      this.redisClient.del(key, (err, reply) => {
        if (err == null) resolve(reply);
        else reject(err);
      });
    });
  }

  exist(key: string) {
    return new Promise((resolve: (isExist: boolean) => void, reject: (error: Error) => void) => {
      this.redisClient.exists(key, (err, reply) => {
        if (err == null) resolve(reply == 1);
        else reject(err);
      });
    });
  }
}

export default RedisHelper;