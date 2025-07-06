```ts
global.fetch = jest.fn().mockResolvedValue({
  json: jest.fn().mockResolvedValue([
    {
      id: 1,

      title: "Learn ReactJS",
    },

    {
      id: 2,

      title: "Learn NextJS",
    },
  ]),
});
```
