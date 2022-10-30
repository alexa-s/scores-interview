/**
 * Basic options for fuse.js library
 * the key to search for: question
 */
const options = {
  include: ["score","matches"],
  shouldSort: true,
  threshold: 0.4,
  distance: 100,
  maxPatternLength: 32,
  minMatchCharLength: 2,
  keys: [
    "question"
  ]
};

export default options;