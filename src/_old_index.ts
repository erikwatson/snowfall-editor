import snowfall, { DEFAULT_WIND } from "@erikwatson/snowfall";

// snowfall.start({
//   background: 'white',
//   layers: [
//     {
//       ...DEFAULT_LAYER,
//       gravity: {
//         ...DEFAULT_GRAVITY,
//         angle: 245,
//       },
//       colour: 'black'
//     },
//     {
//       ...DEFAULT_LAYER,
//       gravity: {
//         ...DEFAULT_GRAVITY,
//         angle: 90,
//       },
//       colour: 'red'
//     }
//   ]
// }))

snowfall.start();

snowfall.setGravity(90, 1, 0)
snowfall.setGravity(240, 1, 1)

console.log(snowfall.diff({ wind: DEFAULT_WIND }))
console.log(snowfall.diff({ wind: {
  "angle": 0,
  "strength": 0,
  "gusts": true,
  "in": {
      "additionalStrength": {
          "min": 3,
          "max": 1
      },
      "duration": {
          "min": 1000,
          "max": 3000
      },
      "delay": {
          "min": 1000,
          "max": 10000
      }
  },
  "out": {
      "duration": {
          "min": 1000,
          "max": 10000
      },
      "delay": {
          "min": 5000,
          "max": 10000
      },
      "changeChance": 0.25
  }
} }))

const elements: Record<string, HTMLInputElement> = {
  freqInput: document.getElementById("frequency") as HTMLInputElement,
  ampInput: document.getElementById("amplitude") as HTMLInputElement,
  densityInput: document.getElementById("density") as HTMLInputElement,
  respectOrientationInput: document.getElementById(
    "respect-orientation"
  ) as HTMLInputElement,
  gravityAngleInput: document.getElementById(
    "gravity-angle"
  ) as HTMLInputElement,
  gravityStrengthInput: document.getElementById(
    "gravity-strength"
  ) as HTMLInputElement,
  windAngleInput: document.getElementById("wind-angle") as HTMLInputElement,
  windStrengthInput: document.getElementById(
    "wind-strength"
  ) as HTMLInputElement,
  primaryColour: document.getElementById("primary") as HTMLInputElement,
  secondaryColour: document.getElementById("secondary") as HTMLInputElement,
  bgInput: document.getElementById("bg") as HTMLInputElement,
  attachToInput: document.getElementById("attach-to") as HTMLInputElement,
  fadeInInput: document.getElementById("fadeInInput") as HTMLInputElement,
  gustsInput: document.getElementById("gusts") as HTMLInputElement,
  inAdditionalStrengthMinInput: document.getElementById(
    "additional-strength-min"
  ) as HTMLInputElement,
  inAdditionalStrengthMaxInput: document.getElementById(
    "additional-strength-max"
  ) as HTMLInputElement,
  inDurationMinInput: document.getElementById(
    "in-duration-min"
  ) as HTMLInputElement,
  inDurationMaxInput: document.getElementById(
    "in-duration-max"
  ) as HTMLInputElement,
  inDelayMinInput: document.getElementById("in-delay-min") as HTMLInputElement,
  inDelayMaxInput: document.getElementById("in-delay-max") as HTMLInputElement,
  outDurationMinInput: document.getElementById(
    "out-duration-min"
  ) as HTMLInputElement,
  outDurationMaxInput: document.getElementById(
    "out-duration-max"
  ) as HTMLInputElement,
  outDelayMinInput: document.getElementById(
    "out-delay-min"
  ) as HTMLInputElement,
  outDelayMaxInput: document.getElementById(
    "out-delay-max"
  ) as HTMLInputElement,
  outChangeChanceInput: document.getElementById(
    "change-chance"
  ) as HTMLInputElement,
};

Object.keys(elements).forEach((key) => {
  const element = elements[key];
  element.addEventListener("change", outputToScreen);
  element.addEventListener("input", outputToScreen);
});

const outputs: Record<string, HTMLSpanElement | HTMLElement> = {
  densityCount: document.getElementById("density-count") as HTMLSpanElement,
  ampCount: document.getElementById("amplitude-count") as HTMLSpanElement,
  frequencyCount: document.getElementById("frequency-count") as HTMLSpanElement,
  gravityAngleCount: document.getElementById(
    "gravity-angle-count"
  ) as HTMLSpanElement,
  gravityStrengthCount: document.getElementById(
    "gravity-strength-count"
  ) as HTMLSpanElement,
  windAngleCount: document.getElementById(
    "wind-angle-count"
  ) as HTMLSpanElement,
  windStrengthCount: document.getElementById(
    "wind-strength-count"
  ) as HTMLSpanElement,
  inAdditionalStrengthMinCount: document.getElementById(
    "additional-strength-min-count"
  ) as HTMLSpanElement,
  inAdditionalStrengthMaxCount: document.getElementById(
    "additional-strength-max-count"
  ) as HTMLSpanElement,
  inDurationMinCount: document.getElementById(
    "in-duration-min-count"
  ) as HTMLSpanElement,
  inDurationMaxCount: document.getElementById(
    "in-duration-max-count"
  ) as HTMLSpanElement,
  inDelayMinCount: document.getElementById(
    "in-delay-min-count"
  ) as HTMLSpanElement,
  inDelayMaxCount: document.getElementById(
    "in-delay-max-count"
  ) as HTMLSpanElement,
  outDurationMinCount: document.getElementById(
    "out-duration-min-count"
  ) as HTMLSpanElement,
  outDurationMaxCount: document.getElementById(
    "out-duration-max-count"
  ) as HTMLSpanElement,
  outDelayMinCount: document.getElementById(
    "out-delay-min-count"
  ) as HTMLSpanElement,
  outDelayMaxCount: document.getElementById(
    "out-delay-max-count"
  ) as HTMLSpanElement,
  outChangeChanceCount: document.getElementById(
    "change-chance-count"
  ) as HTMLSpanElement,
  out: document.getElementById("output") as HTMLElement,
};

function setSnowfallProperty(
  element: HTMLInputElement,
  property: string,
  parseFn: (value: string) => any = parseFloat,
  countElement?: HTMLSpanElement
) {
  element.addEventListener("input", (e: Event) => {
    const target = e.target as HTMLInputElement;
    if (countElement) countElement.innerText = target.value;
    (snowfall as any)[property](parseFn(target.value));
  });
  (snowfall as any)[property](parseFn(element.value));
  if (countElement) countElement.innerText = element.value;
}

setSnowfallProperty(
  elements.freqInput,
  "setFrequency",
  parseFloat,
  outputs.freqCount
);
setSnowfallProperty(
  elements.ampInput,
  "setAmplitude",
  parseFloat,
  outputs.ampCount
);
setSnowfallProperty(
  elements.densityInput,
  "setDensity",
  parseInt,
  outputs.densityCount
);
setSnowfallProperty(
  elements.gravityAngleInput,
  "setGravityAngle",
  parseFloat,
  outputs.gravityAngleCount
);
setSnowfallProperty(
  elements.gravityStrengthInput,
  "setGravityStrength",
  parseFloat,
  outputs.gravityStrengthCount
);
setSnowfallProperty(
  elements.windAngleInput,
  "setWindAngle",
  parseFloat,
  outputs.windAngleCount
);
setSnowfallProperty(
  elements.windStrengthInput,
  "setWindStrength",
  parseFloat,
  outputs.windStrengthCount
);

function setBooleanProperty(element: HTMLInputElement, property: string) {
  element.addEventListener("change", (e: Event) => {
    // console.log(element, property);
    const target = e.target as HTMLInputElement;
    (snowfall as any)[property](target.checked);

    // console.log(target, target.checked);
  });
  (snowfall as any)[property](element.checked);
}

setBooleanProperty(elements.respectOrientationInput, "setRespectOrientation");
setBooleanProperty(elements.fadeInInput, "setFade");
setBooleanProperty(elements.gustsInput, "setGusts");

function setColourProperty(element: HTMLInputElement, property: string) {
  element.addEventListener("change", (e: Event) => {
    const target = e.target as HTMLInputElement;
    (snowfall as any)[property](target.value);
  });
  (snowfall as any)[property](element.value);
}

setColourProperty(elements.primaryColour, "setPrimary");
setColourProperty(elements.secondaryColour, "setSecondary");
setColourProperty(elements.bgInput, "setBackground");

function setWindProperty(
  element: HTMLInputElement,
  property: string,
  parseFn: (value: string) => any = parseFloat,
  countElement?: HTMLSpanElement
) {
  element.addEventListener("change", (e: Event) => {
    const target = e.target as HTMLInputElement;
    if (countElement) countElement.innerText = target.value;
    (snowfall as any)[property](parseFn(target.value));
  });
}

setWindProperty(
  elements.inAdditionalStrengthMinInput,
  "setWindInAdditionalStrengthMin",
  parseFloat,
  outputs.inAdditionalStrengthMinCount
);
setWindProperty(
  elements.inAdditionalStrengthMaxInput,
  "setWindInAdditionalStrengthMax",
  parseFloat,
  outputs.inAdditionalStrengthMaxCount
);
setWindProperty(
  elements.inDurationMinInput,
  "setWindInDurationMin",
  parseInt,
  outputs.inDurationMinCount
);
setWindProperty(
  elements.inDurationMaxInput,
  "setWindInDurationMax",
  parseInt,
  outputs.inDurationMaxCount
);
setWindProperty(
  elements.inDelayMinInput,
  "setWindInDelayMin",
  parseInt,
  outputs.inDelayMinCount
);
setWindProperty(
  elements.inDelayMaxInput,
  "setWindInDelayMax",
  parseInt,
  outputs.inDelayMaxCount
);
setWindProperty(
  elements.outDurationMinInput,
  "setWindOutDurationMin",
  parseInt,
  outputs.outDurationMinCount
);
setWindProperty(
  elements.outDurationMaxInput,
  "setWindOutDurationMax",
  parseInt,
  outputs.outDurationMaxCount
);
setWindProperty(
  elements.outDelayMinInput,
  "setWindOutDelayMin",
  parseInt,
  outputs.outDelayMinCount
);
setWindProperty(
  elements.outDelayMaxInput,
  "setWindOutDelayMax",
  parseInt,
  outputs.outDelayMaxCount
);
setWindProperty(
  elements.outChangeChanceInput,
  "setWindOutChangeChance",
  parseFloat,
  outputs.outChangeChanceCount
);

function makeConfig(): string {
  const config = {
    attachTo: elements.attachToInput.value,
    background: elements.bgInput.value,
    primary: elements.primaryColour.value,
    secondary: elements.secondaryColour.value,
    density: parseInt(elements.densityInput.value),
    fadeIn: elements.fadeInInput.checked,
    wave: {
      frequency: parseFloat(elements.freqInput.value),
      amplitude: parseFloat(elements.ampInput.value),
    },
    gravity: {
      angle: parseInt(elements.gravityAngleInput.value),
      strength: parseFloat(elements.gravityStrengthInput.value),
      respectOrientation: elements.respectOrientationInput.checked,
    },
    wind: {
      angle: parseInt(elements.windAngleInput.value),
      strength: parseFloat(elements.windStrengthInput.value),
      gusts: elements.gustsInput.checked,
      in: {
        additionalStrength: {
          min: parseFloat(elements.inAdditionalStrengthMinInput.value),
          max: parseFloat(elements.inAdditionalStrengthMaxInput.value),
        },
        duration: {
          min: parseInt(elements.inDurationMinInput.value),
          max: parseInt(elements.inDurationMaxInput.value),
        },
        delay: {
          min: parseInt(elements.inDelayMinInput.value),
          max: parseInt(elements.inDelayMaxInput.value),
        },
      },
      out: {
        duration: {
          min: parseInt(elements.outDurationMinInput.value),
          max: parseInt(elements.outDurationMaxInput.value),
        },
        delay: {
          min: parseInt(elements.outDelayMinInput.value),
          max: parseInt(elements.outDelayMaxInput.value),
        },
        changeChance: parseFloat(elements.outChangeChanceInput.value),
      },
    },
  };

  const diffed = snowfall.diff(config);

  if (Object.keys(diffed).length === 0) {
    return '';
  }

  return `${JSON.stringify(diffed, null, 2)}`;
}

function wrapInSnow(txt: string): string {
  return `snowfall.start(${txt})`;
}

function outputToScreen() {
  outputs.out.innerText = wrapInSnow(makeConfig());
  hljs.highlightBlock(outputs.out);
}

outputToScreen();
hljs.initHighlightingOnLoad();
