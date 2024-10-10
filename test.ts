import { SnowflakeId } from './dist/index.mjs';
const workerId = process.pid % 1024;
console.log('workerId', workerId);
const snowflake = SnowflakeId({
  workerId,
});
console.log(snowflake.generate());
console.log('sss'.padStart(1));
