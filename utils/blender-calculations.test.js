import calculateBlenderSettings from "./blender-calculations";

const ean32 = {
  oxygenPercentage: 32,
  heliumPercentage: 0
}

const air = {
  oxygenPercentage: 21,
  heliumPercentage: 0
}

const tx18 = {
  oxygenPercentage: 18,
  heliumPercentage: 45,
}

const tx21 = {
  oxygenPercentage: 21,
  heliumPercentage: 35,
}


test("Keeps EAN32 in standard fill", () => {
  expect(calculateBlenderSettings({
    bars: 130,
    ...ean32
  }, {
    bars: 232,
    ...ean32
  })).toEqual([32, 0]);
});

test("Fills an empty bottle correctly", () => {
  expect(calculateBlenderSettings({
    bars: 0,
    ...air
  }, {
    bars: 232,
    ...air
  })).toEqual([21, 0]);

  expect(calculateBlenderSettings({
    bars: 0,
    ...ean32
  }, {
    bars: 232,
    ...ean32
  })).toEqual([32, 0]);

  expect(calculateBlenderSettings({
    bars: 0,
    ...air
  }, {
    bars: 300,
    ...tx21
  })).toEqual([21, 35]);
})

test("Fills Trimix correctly", () => {
  expect(calculateBlenderSettings(
    {
      bars: 100,
      ...ean32
    }, {
      bars: 232,
      ...tx21
    }
  )).toEqual([12.7, 61.5]);

  expect(calculateBlenderSettings(
    {
      bars: 100,
      ...ean32
    }, {
      bars: 232,
      ...tx18
    }
  )).toEqual([7.4, 79.1]);

  expect(calculateBlenderSettings(
    {
      bars: 60,
      ...air
    }, {
      bars: 232,
      ...tx21
    }
  )).toEqual([21, 47.2]);
})

