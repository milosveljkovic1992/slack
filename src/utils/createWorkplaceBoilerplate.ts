import { createNewChannel, verifyChannelCreated } from './createNewChannel';

// prettier-ignore
export const createWorkplaceBoilerplate = async (
  workplaceId: string
) => {
  const boilerplateChannels = ['general'];
  try {
    for (const channel of boilerplateChannels) {
      const channelId = await createNewChannel(workplaceId, channel);
      await verifyChannelCreated(workplaceId, channelId);
    }
  } catch (error) {
    if (error) throw error
  }
};
