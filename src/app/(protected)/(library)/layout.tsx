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
  const props = {
    limit: 10,
    order: JSON.stringify({ name: "asc" }),
  };
  const { media } = await listMedia(props);

  return (
    <MasterDetailLayout>
      <MasterDetailLayoutMasterPanel>
        <MediaWidget media={media} {...props} />
      </MasterDetailLayoutMasterPanel>
      <MasterDetailLayoutDetailPanel>{children}</MasterDetailLayoutDetailPanel>
    </MasterDetailLayout>
  );
}
