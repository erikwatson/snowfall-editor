import { clone, DEFAULT_IMAGE_LAYER, DEFAULT_SIMPLE_LAYER } from "@erikwatson/snowfall";
import { Types, isSimpleLayer } from "@erikwatson/snowfall";
import { faCircle, faImage, faPlus, faTrash, faUndo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "../../button/button";
import { Control } from "../../control/control";
import { ControlGroup } from "../../controlGroup/controlGroup";
import { Group } from "../../group/group";
import { Layer } from "../../layer/layer";
import { useDispatch } from "react-redux";
import { SnowflakeColour } from "./colour/colour";
import { SnowflakeDensity } from "./density/density";
import { SnowflakeMass } from "./mass/mass";
import { SnowflakeGravityAngle } from "./gravity-settings/angle/angle";
import { SnowflakeGravityStrength } from "./gravity-settings/strength/strength";
import { SnowflakeSwayFrequency } from "./sway-settings/frequency/frequency";
import { SnowflakeSwayAmplitude } from "./sway-settings/amplitude/amplitude";
import { SnowflakeWindAngle } from "./wind-settings/angle/angle";
import { SnowflakeWindStrength } from "./wind-settings/strength/strength";
import { SnowflakeGustActive } from "./gust-settings/active";
import { SnowflakeGustChangeChange } from "./gust-settings/change-chance";
import { SnowflakeGustAdditionalStrength } from "./gust-settings/additional-strength";
import { SnowflakeGustInDelay } from "./gust-settings/in-delay";
import { SnowflakeGustInDuration } from "./gust-settings/in-duration";
import { SnowflakeGustOutDelay } from "./gust-settings/out-delay";
import { SnowflakeGustOutDuration } from "./gust-settings/out-duration";
import { Text } from "../../text/text";
import { ChangeEvent, useEffect, useState } from "react";

import "./layer-settings.css";
import {
  addLayer,
  duplicateLayer,
  removeLayer,
  resetLayer,
  resetLayers,
  resetUserConfig,
  setUserConfig,
  moveLayerDown,
  moveLayerUp,
  setLayerRotation,
  setLayerImage
} from "../../../features/config/config.slice";
import { PRESET_SNOW } from "../../../presets/snow";
import {
  PresetVariation,
  resetEditorSettings,
  setEditorSettings,
} from "../../../features/editor-settings/editor-settings.slice";
import { PRESET_LAVA } from "../../../presets/lava";
import { PRESET_FALLOUT } from "../../../presets/fallout";
import { PRESET_SPACE } from "../../../presets/space";
import { CheckBox } from "../../checkbox/checkbox";
import { ImageLayerConfig } from "@erikwatson/snowfall";
import { SnowflakeSize } from "./size/size";

type LayerSettingsProps = {
  layers?: Types.DeepPartial<Types.ConfigLayer>[];
  advancedSettings: boolean;
  preset?: PresetVariation;
};

export const LayerSettings = ({
  layers,
  advancedSettings,
  preset,
}: LayerSettingsProps) => {
  const dispatch = useDispatch();

  const layerTitles = layers?.map((x, i) => {
    return (x.mode === 'simple')
      ? `Simple layer ${i + 1}`
      : `Image layer ${i + 1}`
  });
  const [titles, setTitles] = useState(layerTitles);

  // Sync titles with layerTitles when layers change
  useEffect(() => {
    setTitles(layerTitles);
  }, [layers]);

  console.log('layers', layers)
  console.log('titles', titles);

  const [b64, setb64] = useState('');

  return (
    <>
      <div className="layers-header">
        <h2>Layer settings</h2>

        <div>
          <Button
            tooltip="New simple layer"
            onClick={() => {
              dispatch(addLayer(DEFAULT_SIMPLE_LAYER));
              setTitles(titles => {
                titles = (titles || []);
                const name = `Simple layer ${titles.length + 1}`
                return [...titles, name];
              })
            }}
          >
            New <FontAwesomeIcon icon={faCircle} />
          </Button>

          <Button
            tooltip="New image layer"
            onClick={() => {
              dispatch(addLayer(DEFAULT_IMAGE_LAYER));
              setTitles(titles => {
                titles = (titles || []);
                const name = `Image layer ${titles.length + 1}`
                return [...titles, name];
              })
            }}
          >
            New <FontAwesomeIcon icon={faImage} />
          </Button>

          <Button
            tooltip="Reset to preset"
            kind="error"
            onClick={() => {
              const value =
                preset === "snow"
                  ? PRESET_SNOW
                  : preset === "lava"
                    ? PRESET_LAVA
                    : preset === "space"
                      ? PRESET_SPACE
                      : preset === "fallout"
                        ? PRESET_FALLOUT
                        : null;

              if (value) {
                dispatch(setUserConfig(value.userConfig));
                dispatch(setEditorSettings(value.editorConfig));
              } else {
                dispatch(resetUserConfig());
                dispatch(resetEditorSettings());
              }
            }}
          >
            <FontAwesomeIcon icon={faUndo} />
          </Button>

          <Button
            tooltip="Remove all layers"
            kind="error"
            onClick={() => {
              dispatch(resetLayers());
            }}
          >
            <FontAwesomeIcon icon={faTrash} />
          </Button>
        </div>
      </div>

      {layers?.length === 0 && (
        <div className="empty-layers">
          <p>No layers yet.</p>
          <p>Add one to get started!</p>
        </div>
      )}

      {layers
        ?.map((x, i) => {
          const result: Types.ConfigLayer & { id: number } = clone(x);
          result.id = i;
          return result;
        })
        ?.map((layer, index) => (
          <>
            <Layer
              colour="grey-2"
              id={index}
              size={layers.length - 1}
              key={index}
              name={titles ? titles[index] : `Layer ${index + 1}`}
              mode={layer.mode}
              remove={() => {
                dispatch(removeLayer(index));
              }}
              duplicate={() => {
                dispatch(duplicateLayer(index));
              }}
              reset={() => {
                dispatch(resetLayer(index));
              }}
              layerUp={() => {
                dispatch(moveLayerUp({ index }));
                setTitles((prevTitles) => {
                  prevTitles = (prevTitles || [])
                  const newTitles = [...prevTitles];
                  [newTitles[index], newTitles[index - 1]] = [newTitles[index - 1], newTitles[index]];
                  return newTitles;
                });
              }}
              layerDown={() => {
                dispatch(moveLayerDown({ index }));
                setTitles((prevTitles) => {
                  prevTitles = (prevTitles || [])
                  const newTitles = [...prevTitles];
                  [newTitles[index], newTitles[index + 1]] = [newTitles[index + 1], newTitles[index]];
                  return newTitles;
                });
              }}
            >
              <ControlGroup>
                <Control
                  name="Title"
                  onChange={(event) => {
                    setTitles((titles) => {
                      const newTitles = [...(titles || [])];
                      newTitles[index] = event.target.value;
                      return newTitles;
                    });
                  }}
                  reset={() => {
                    setTitles((titles) => {
                      const newTitles = [...(titles || [])];
                      newTitles[index] = `Layer ${index + 1}`;
                      return newTitles;
                    });
                  }}
                  value={titles ? titles[index] : `Layer ${index + 1} :)`}
                >
                  <Text />
                </Control>
              </ControlGroup>

              <Group name="Snow" colour="secondary">
                {isSimpleLayer(layer) &&
                  <SnowflakeColour layer={layer} index={index} />
                }
                {!isSimpleLayer(layer) &&
                  <>
                    <Control name="Image" tooltip="Upload an image file" reset={() => { }} value={layer.image} onChange={(event: ChangeEvent<HTMLInputElement>) => {
                        const input = event.target as HTMLInputElement;
                        const file = input.files?.[0]; // Access files safely
                        if (file) {
                          const reader = new FileReader();
                          reader.onload = () => {
                            const base64String = reader.result as string; // Base64 encoded image
                            dispatch(setLayerImage({ index, image: base64String }));
                          };
                          reader.readAsDataURL(file);
                        }
                      }}>
                      <input type="file" accept="image/*"></input>
                    </Control>

                    
                  </>
                }
                <SnowflakeDensity layer={layer} index={index} />
                <SnowflakeMass layer={layer} index={index} />
                <SnowflakeSize layer={layer} index={index} />
              </Group>

              <Group name="Motion" colour="secondary">
                {!isSimpleLayer(layer) &&
                  <Control
                    name="Rotate"
                    tooltip="Should the snowflakes rotate or not?"
                    reset={() => {
                      // 
                    }}
                    value={(layer as ImageLayerConfig).rotate}
                    onChange={(event) => {
                      dispatch(
                        setLayerRotation({
                          index,
                          rotate: event.target.checked,
                        })
                      );
                    }}
                  >
                    <CheckBox />
                  </Control>
                }

                {advancedSettings && (
                  <Group name="Gravity" colour="grey-2">
                    <ControlGroup>
                      <SnowflakeGravityAngle layer={layer} index={index} />
                      <SnowflakeGravityStrength layer={layer} index={index} />
                    </ControlGroup>
                  </Group>
                )}

                {advancedSettings && (
                  <Group name="Sway" colour="grey-2">
                    <ControlGroup>
                      <SnowflakeSwayAmplitude layer={layer} index={index} />
                      <SnowflakeSwayFrequency layer={layer} index={index} />
                    </ControlGroup>
                  </Group>
                )}

                <Group name="Wind" colour="grey-2">
                  <ControlGroup>
                    {advancedSettings && (
                      <SnowflakeWindAngle layer={layer} index={index} />
                    )}
                    <SnowflakeWindStrength layer={layer} index={index} />
                  </ControlGroup>
                  <Group name="Gusts" colour="secondary">
                    <ControlGroup>
                      <SnowflakeGustActive layer={layer} index={index} />
                      {layer.wind.gusts.active && (
                        <SnowflakeGustChangeChange layer={layer} index={index} />
                      )}
                    </ControlGroup>

                    {layer.wind.gusts.active && advancedSettings && (
                      <>
                        <Group name="In" colour="grey-2">
                          <SnowflakeGustAdditionalStrength
                            layer={layer}
                            index={index}
                          />
                          <SnowflakeGustInDelay layer={layer} index={index} />
                          <SnowflakeGustInDuration layer={layer} index={index} />
                        </Group>

                        <Group name="Out" colour="grey-2">
                          <SnowflakeGustOutDelay layer={layer} index={index} />
                          <SnowflakeGustOutDuration layer={layer} index={index} />
                        </Group>
                      </>
                    )}
                  </Group>
                </Group>
              </Group>
            </Layer>
          </>
        ))}
    </>
  );
};
