#!/bin/sh
set -e

TEMPLATE=/usr/local/etc/redis/redis.conf.template
CONFIG=/usr/local/etc/redis/redis.conf

cp "$TEMPLATE" "$CONFIG"

sed -i "s|{{REDIS_PORT}}|${REDIS_PORT:-6379}|g" "$CONFIG"
sed -i "s|{{REDIS_DATABASES}}|${REDIS_DATABASES:-16}|g" "$CONFIG"

if [ -z "$REDIS_PASSWORD" ]; then
  sed -i "/requirepass/d" "$CONFIG"
else
  sed -i "s|{{REDIS_PASSWORD}}|$REDIS_PASSWORD|g" "$CONFIG"
fi

exec redis-server "$CONFIG"
