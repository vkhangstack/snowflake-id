<h1 align="center" style="border-bottom: none;"> @vkhangstack/snowflake-id</h1>
<h3 align="center">A simple and lightweight Node.js library to generate unique snowflake IDs.</h3>
<br />
<p align="center">
  <a href="https://www.npmjs.com/package/@vkhangstack/snowflake-id">
    <img alt="npm latest version" src="https://img.shields.io/npm/v/@vkhang2stack/snowflake-id/latest.svg">
  </a>
  <a href="https://www.npmjs.com/package/@vkhangstack/snowflake-id">
    <img alt="npm bundle size" src="https://img.shields.io/bundlephobia/min/@vkhang2stack/snowflake-id">
  </a>
  <img alt="Visitors count" src="https://visitor-badge.laobi.icu/badge?page_id=@vkhangstack~snowflake-id.visitor-badge&style=flat-square&color=0088cc">
  
  <p  align="center">
  <a href="https://www.npmjs.com/package/@vkhangstack/snowflake-id">
    <img alt="NPM license" src="https://img.shields.io/npm/l/@vkhang2stack/snowflake-id">
  </a>
  </p>
  </p>

  <p align="center">
    <a href="https://github.com/vkhangstack/snowflake-id/issues/new?template=bug_report.md">Bug report</a>
    ·
    <a href="https://github.com/vkhangstack/snowflake-id/issues/new?template=feature_request.md">Feature request</a>
  </p>
<br />
<hr />

`@vkhang2stack/snowflake-id` is a Node.js library for generating unique and distributed IDs that are suitable for use as primary keys in distributed systems.

It generates 64-bit IDs (in string format) that are composed of a timestamp, a worker ID, and a sequence number. These IDs are based on [Twitter's Snowflake ID](https://github.com/twitter-archive/snowflake/tree/snowflake-2010) generation algorithm.

<!--
> Read in detail about [what are Snowflake IDs](https://vkhangstack.io.vn/blog/slug/?ref=github-desc) -->

## Installation 🚀

You can install `@vkhang2stack/snowflake-id` using pnpm/npm/yarn:

```bash
pnpm add @vkhang2stack/snowflake-id

# OR

npm install @vkhang2stack/snowflake-id

# OR

yarn add @vkhang2stack/snowflake-id
```

## Usage 💻

Here's an example of how to use `@vkhang2stack/snowflake-id`:

```javascript
import { SnowflakeId } from '@vkhang2stack/snowflake-id';

const snowflake = SnowflakeId({
  workerId: 1,
  epoch: 1597017600000,
});

console.log(snowflake.generate()); // 14755887168818983731200
```

This will generate a unique ID in string format.

## Configuration options ⚙️

The SnowflakeId constructor takes an options object with the following properties:

- `workerId` (optional): A ID of the worker generating the Snowflake IDs.

  Defaults to 0 if not specified.

- `epoch` (optional): A timestamp in milliseconds representing the start of the ID generation.

  Defaults to August 10, 2020 at 00:00:00 UTC if not specified.

## Methods 🧮

The SnowflakeId instance has the following methods:

- `generate()`: Generates a unique ID in string format.

## Error Handling 😱

There are two errors that can be thrown by the SnowflakeId instance:

- `Invalid Epoch Error`: The SnowflakeId instance throws an error if the epoch timestamp is invalid, i.e., if the epoch timestamp is greater than the current timestamp.

- `Clock Backwards Error`: The SnowflakeId instance throws an error if the clock moves backwards, i.e., if the current timestamp is less than the last timestamp.

## Examples 🔠

Here's an example of how to generate 10 IDs:

```javascript
import { SnowflakeId } from '@vkhang2stack/snowflake-id';

const snowflake = SnowflakeId();

for (let i = 0; i < 10; i++) {
  console.log(snowflake.generate());
}
```

And here's an example of how to generate IDs using different worker IDs:

```javascript
import { SnowflakeId } from '@vkhang2stack/snowflake-id';

const worker1 = SnowflakeId({ workerId: 1 });
const worker2 = SnowflakeId({ workerId: 2 });

console.log(worker1.generate()); // Generates an ID with worker ID 1
console.log(worker2.generate()); // Generates an ID with worker ID 2
```

While using it in distributed systems, it is highly recommended that you set a unique `workerId` to reduce collisions of IDS.

While the implementation detail depends on you, one simple way to set a possible unique `workerId` is to use `process.pid`.

```javascript
import { SnowflakeId } from '@vkhang2stack/snowflake-id';

const workerId = process.pid % 1024; // Using PID as workerId
const snowflake = SnowflakeId({ workerId });

const id = snowflake.generate(); // Generate a new Snowflake ID
console.log(id);
```

## Notes 📝

- The `workerId` parameter can be omitted, in which case the `workerId` would be set to 0. However, if you expect to generate IDs on multiple machines, it is recommended to set a specific workerId value to reduce the chance of ID collisions.

- The epoch timestamp should be set as close to the current time as possible to maximize the lifespan of the generator. If the epoch is set too far in the past or future, the generator may not be able to generate IDs for the full lifespan of the generator.
  <details>
    <summary>Learn more</summary>
    <p>The epoch timestamp is used as the starting point for generating unique IDs. If the epoch timestamp is set too far in the past or future, it can limit the lifespan of the generator. This is because the timestamp portion of a generated ID is typically a smaller number of bits compared to the total number of bits in the ID, and as a result, the maximum value for the timestamp portion can be reached more quickly than the other portions.</p>
    <p>For example, if the epoch timestamp is set to January 1, 1970, which is the Unix epoch, and the generator is configured to use 41 bits for the timestamp portion, the maximum value for the timestamp portion would be reached in the year 2088. This means that after 2088, the generator would no longer be able to generate unique IDs.</p>
    <p>Therefore, it's important to set the epoch timestamp as close to the current time as possible to maximize the lifespan of the generator. This will ensure that the timestamp portion of the generated IDs will not reach their maximum value too quickly, allowing the generator to continue generating unique IDs for a longer period of time.</p>
  </details>

## Bugs or Requests 🐛

If you encounter any problems feel free to open an [issue](https://github.com/vkhangstack/snowflake-id/issues/new?template=bug_report.md). If you feel the project is missing a feature, please raise a [ticket](https://github.com/vkhangstack/snowflake-id/issues/new?template=feature_request.md) on GitHub and I'll look into it. Pull requests are also welcome.

## Where to find me? 👀

[![Linkedin Badge](https://img.shields.io/badge/-@vkhangstack-0e76a8?logo=Linkedin&logoColor=white)](https://linkedin.com/in/vkhangstack)
