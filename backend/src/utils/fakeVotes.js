import { encrypt } from './encryption';

export const generateFakeVotes = async (pollId, optionCount, realVoteCount) => {
  const fakeVotes = [];
  const fakeVoteCount = Math.floor(realVoteCount * (Math.random() * 0.05 + 0.05)); // 5-10% of real votes

  for (let i = 0; i < fakeVoteCount; i++) {
    const randomOptionIndex = Math.floor(Math.random() * optionCount);
    const randomUserId = `fake-user-${Math.random().toString(36).substring(2, 15)}`;

    fakeVotes.push({
      poll: pollId,
      optionIndex: randomOptionIndex,
      encryptedVoterId: encrypt(randomUserId),
      isFake: true,
    });
  }

  return fakeVotes;
};