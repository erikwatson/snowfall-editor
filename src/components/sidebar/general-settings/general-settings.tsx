import { useDispatch } from "react-redux";
import { Control } from "../../control/control";
import { ControlGroup } from "../../controlGroup/controlGroup";
import { Text } from "../../text/text";
import { resetAttachTo, setAttachTo } from "../../../features/config/config.slice";

type GeneralSettingsProps = {
  attachTo?: string;
  background?: string;
};

export const GeneralSettings = ({ attachTo }: GeneralSettingsProps) => {
  const dispatch = useDispatch();
  
  return (
    <>
      <h2>Snowfall settings</h2>
      <p>Everything below here (except for Layer Titles) <b>will</b> be exported with your config.</p>
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
