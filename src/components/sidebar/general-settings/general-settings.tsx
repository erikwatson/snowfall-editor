import { useDispatch } from "react-redux";
import { Colour } from "../../colour/colour";
import { Control } from "../../control/control";
import { ControlGroup } from "../../controlGroup/controlGroup";
import { Group } from "../../group/group";
import { Text } from "../../text/text";
import { resetAttachTo, setAttachTo } from "../../../features/config/config.slice";
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "../../button/button";

type GeneralSettingsProps = {
  attachTo?: string;
  background?: string;
};

export const GeneralSettings = ({ attachTo, background }: GeneralSettingsProps) => {
  const dispatch = useDispatch();
  
  return (
    <>
      <h2>Snowfall settings</h2>
      {/* <Button kind="transparent" onClick={() => null} tooltip={'Everything below here WILL be exported with your config.'}>
              <FontAwesomeIcon icon={faQuestionCircle} style={{ color: '#64748b' }} />
            </Button> */}
      <p>Everything below here <b>will</b> be exported with your config.</p>
      <ControlGroup>
        <Control
          name="Attach to"
          tooltip="The element to attach the snowfall simulation to"
          reset={() => {
            dispatch(resetAttachTo());
          }}
          value={attachTo}
          onChange={(event) =>
            dispatch(setAttachTo(event.target.value))
          }
        >
          <Text />
        </Control>
      </ControlGroup>
    </>
  );
};
