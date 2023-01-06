export interface CommitPrefixType {
  [x: string]: CommiePrefixItem
}

export interface CommiePrefixItem {
  emoji: string
  code: string
  description: {
    ja: string
    en: string
  }
}

export const COMMIT_PREFIX: CommitPrefixType = {
  feat: {
    code: `:sparkles:`,
    emoji: `✨`,
    description: {
      ja: `ユーザー向けの機能の追加や変更`,
      en: `new feature for the user, not a new feature for build script`,
    },
  },
  fix: {
    code: `:bug:`,
    emoji: `🐛`,
    description: {
      ja: `ユーザー向けの不具合の修正`,
      en: `bug fix for the user, not a fix to a build script`,
    },
  },
  docs: {
    code: `:memo:`,
    emoji: `📝`,
    description: {
      ja: `ドキュメントの更新`,
      en: `changes to the documentation`,
    },
  },
  style: {
    code: `:art:`,
    emoji: `🎨`,
    description: {
      ja: `フォーマットなどのスタイルに関する修正`,
      en: `formatting, missing semi colons, etc; no production code change`,
    },
  },
  refactor: {
    code: `:recycle:`,
    emoji: `♻️`,
    description: {
      ja: `リファクタリングを目的とした修正`,
      en: `refactoring production code, eg. renaming a variable`,
    },
  },
  test: {
    code: `:white_check_mark:`,
    emoji: `✅`,
    description: {
      ja: `テストコードの追加や修正`,
      en: `adding missing tests, refactoring tests; no production code change`,
    },
  },
  chore: {
    code: `:wrench:`,
    emoji: `🔧`,
    description: {
      ja: `タスクファイルなどプロダクションに影響のない修正`,
      en: `updating grunt tasks etc; no production code change`,
    },
  },
  remove: {
    code: `:fire:`,
    emoji: `🔥`,
    description: {
      ja: `不要なファイルやコードの削除`,
      en: `Delete unnecessary files and code`,
    },
  },
}
