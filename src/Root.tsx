import { Composition } from "remotion";
import { GlassPodcast } from "./Composition";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="MyComp"
        component={GlassPodcast}
        durationInFrames={120}
        fps={30}
        width={1080}
        height={1920}
      />
    </>
  );
};
