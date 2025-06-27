import {
  MasterDetailLayout,
  MasterDetailLayoutDetailPanel,
  MasterDetailLayoutMasterPanel,
} from "@radio-aktywne/ui";

import { MediaWidget } from "../../../components/widgets/media/media-widget";
import { listMedia } from "../../../lib/pelican/media/list-media";
import { LibraryLayoutInput } from "./types";

export const dynamic = "force-dynamic";

export default async function LibraryLayout({ children }: LibraryLayoutInput) {
  const { media } = await listMedia();

  return (
    <MasterDetailLayout>
      <MasterDetailLayoutMasterPanel>
        <MediaWidget media={media} />
      </MasterDetailLayoutMasterPanel>
      <MasterDetailLayoutDetailPanel>{children}</MasterDetailLayoutDetailPanel>
    </MasterDetailLayout>
  );
}
