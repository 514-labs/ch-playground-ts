// Welcome to your new Moose analytical backend! 🦌

// Getting Started Guide:

// 1. Data Modeling
// First, plan your data structure and create your data models
// → See: docs.fiveonefour.com/moose/building/data-modeling
//   Learn about type definitions and data validation

// 2. Set Up Ingestion
// Create ingestion pipelines to receive your data via REST APIs
// → See: docs.fiveonefour.com/moose/building/ingestion
//   Learn about IngestPipeline, data formats, and validation

// 3. Create Workflows
// Build data processing pipelines to transform and analyze your data
// → See: docs.fiveonefour.com/moose/building/workflows
//   Learn about task scheduling and data processing

// 4. Configure Consumption APIs
// Set up queries and real-time analytics for your data
// → See: docs.fiveonefour.com/moose/building/consumption-apis

// Need help? Check out the quickstart guide:
// → docs.fiveonefour.com/moose/getting-started/quickstart


import { IngestPipeline, Key, ClickHouseInt, ClickHouseDecimal, ClickHousePrecision, ClickHouseByteSize } from "@514labs/moose-lib";
import typia from "typia";

export enum Radio {
    // "" = 0,
    "CDMA" = 1,
    "GSM" = 2,
    "LTE" = 3,
    "NR" = 4,
    "UMTS" = 5,
}

export enum Type {
    "story" = 1,
    "comment" = 2,
    "poll" = 3,
    "pollopt" = 4,
    "job" = 5,
}

export enum EventType {
    "CommitCommentEvent" = 1,
    "CreateEvent" = 2,
    "DeleteEvent" = 3,
    "ForkEvent" = 4,
    "GollumEvent" = 5,
    "IssueCommentEvent" = 6,
    "IssuesEvent" = 7,
    "MemberEvent" = 8,
    "PublicEvent" = 9,
    "PullRequestEvent" = 10,
    "PullRequestReviewCommentEvent" = 11,
    "PushEvent" = 12,
    "ReleaseEvent" = 13,
    "SponsorshipEvent" = 14,
    "WatchEvent" = 15,
    "GistEvent" = 16,
    "FollowEvent" = 17,
    "DownloadEvent" = 18,
    "PullRequestReviewEvent" = 19,
    "ForkApplyEvent" = 20,
    "Event" = 21,
    "TeamAddEvent" = 22,
}

export enum State {
    "none" = 0,
    "open" = 1,
    "closed" = 2,
}

export enum MergeableState {
    "unknown" = 0,
    "dirty" = 1,
    "clean" = 2,
    "unstable" = 3,
    "draft" = 4,
    "blocked" = 5,
}

export enum Action {
    "none" = 0,
    "created" = 1,
    "added" = 2,
    "edited" = 3,
    "deleted" = 4,
    "opened" = 5,
    "closed" = 6,
    "reopened" = 7,
    "assigned" = 8,
    "unassigned" = 9,
    "labeled" = 10,
    "unlabeled" = 11,
    "review_requested" = 12,
    "review_request_removed" = 13,
    "synchronize" = 14,
    "started" = 15,
    "published" = 16,
    "update" = 17,
    "create" = 18,
    "fork" = 19,
    "merged" = 20,
}

export enum VendorId {
    // "1" = 1,
    // "2" = 2,
    // "3" = 3,
    // "4" = 4,
    "CMT" = 5,
    "VTS" = 6,
    "DDS" = 7,
    "B02512" = 10,
    "B02598" = 11,
    "B02617" = 12,
    "B02682" = 13,
    "B02764" = 14,
    // "" = 15,
}

export enum Duration {
    "unknown" = 0,
    "freehold" = 1,
    "leasehold" = 2,
}

export enum PaymentType {
    "UNK" = 0,
    "CSH" = 1,
    "CRE" = 2,
    "NOC" = 3,
    "DIS" = 4,
}

export enum Type2 {
    "other" = 0,
    "terraced" = 1,
    "semi-detached" = 2,
    "detached" = 3,
    "flat" = 4,
}

export enum RefType {
    "none" = 0,
    "branch" = 1,
    "tag" = 2,
    "repository" = 3,
    "unknown" = 4,
}

export enum AuthorAssociation {
    "NONE" = 0,
    "CONTRIBUTOR" = 1,
    "OWNER" = 2,
    "COLLABORATOR" = 3,
    "MEMBER" = 4,
    "MANNEQUIN" = 5,
}

export enum CabType {
    "yellow" = 1,
    "green" = 2,
    "uber" = 3,
}

export enum ReviewState {
    "none" = 0,
    "approved" = 1,
    "changes_requested" = 2,
    "commented" = 3,
    "dismissed" = 4,
    "pending" = 5,
}

export enum Type1 {
    "top" = 1,
    "new" = 2,
    "best" = 3,
    "ask" = 4,
    "show" = 5,
    "job" = 6,
}

export enum Status {
    "waiting" = 1,
    "queued" = 2,
    "in_progress" = 3,
    "completed" = 4,
}

export interface actors {
    login: Key<string>;
    type: string;
    siteAdmin: boolean;
    name: string;
    company: string;
    blog: string;
    location: string;
    email: string;
    hireable: boolean;
    bio: string;
    twitterUsername: string;
    publicRepos: number & ClickHouseInt<"int64">;
    publicGists: number & ClickHouseInt<"int64">;
    followers: number & ClickHouseInt<"int64">;
    following: number & ClickHouseInt<"int64">;
    createdAt: Date;
    updatedAt: Date;
}

export interface benchmark_results {
    runId: Key<string & typia.tags.Format<"uuid">>;
    queryNum: Key<number & ClickHouseInt<"uint8">>;
    tryNum: Key<number & ClickHouseInt<"uint8">>;
    time: string & ClickHouseDecimal<9, 3>;
}

export interface benchmark_runs {
    runId: Key<string & typia.tags.Format<"uuid">>;
    version: string;
    testTime: Date;
    threads: string;
    fsCapacity: number & ClickHouseInt<"uint64">;
    fsAvailable: number & ClickHouseInt<"uint64">;
    cpuModel: string;
    cpu: string;
    df: string;
    memory: string;
    memoryTotal: string;
    blk: string;
    mdstat: string;
    instance: string;
}

export interface cell_towers {
    radio: Key<Radio>;
    mcc: Key<number & ClickHouseInt<"uint16">>;
    net: Key<number & ClickHouseInt<"uint16">>;
    area: number & ClickHouseInt<"uint16">;
    cell: number & ClickHouseInt<"uint64">;
    unit: number & ClickHouseInt<"int16">;
    lon: number;
    lat: number;
    range: number & ClickHouseInt<"uint32">;
    samples: number & ClickHouseInt<"uint32">;
    changeable: number & ClickHouseInt<"uint8">;
    created: Key<Date>;
    updated: Date;
    averageSignal: number & ClickHouseInt<"uint8">;
}

export interface checks {
    pullRequestNumber: number & ClickHouseInt<"uint32">;
    commitSha: string;
    checkName: string;
    checkStatus: string;
    checkDurationMs: number & ClickHouseInt<"uint64">;
    checkStartTime: Key<Date>;
    testName: string;
    testStatus: string;
    testDurationMs: number & ClickHouseInt<"uint64">;
    reportUrl: string;
    pullRequestUrl: string;
    commitUrl: string;
    taskUrl: string;
    baseRef: string;
    baseRepo: string;
    headRef: string;
    headRepo: string;
    testContextRaw: string;
    instanceType: string;
    instanceId: string;
}

export interface cisco_umbrella {
    date: Key<string & typia.tags.Format<"date"> & ClickHouseByteSize<2>>;
    rank: number & ClickHouseInt<"uint32">;
    domain: Key<string>;
}

export interface covid {
    date: Key<string & typia.tags.Format<"date"> & ClickHouseByteSize<2>>;
    locationKey: Key<string>;
    newConfirmed: number & ClickHouseInt<"int32">;
    newDeceased: number & ClickHouseInt<"int32">;
    newRecovered: number & ClickHouseInt<"int32">;
    newTested: number & ClickHouseInt<"int32">;
    cumulativeConfirmed: number & ClickHouseInt<"int32">;
    cumulativeDeceased: number & ClickHouseInt<"int32">;
    cumulativeRecovered: number & ClickHouseInt<"int32">;
    cumulativeTested: number & ClickHouseInt<"int32">;
}

export interface dish {
    id: Key<number & ClickHouseInt<"uint32">>;
    name: string;
    description: string;
    menusAppeared: number & ClickHouseInt<"uint32">;
    timesAppeared: number & ClickHouseInt<"int32">;
    firstAppeared: number & ClickHouseInt<"uint16">;
    lastAppeared: number & ClickHouseInt<"uint16">;
    lowestPrice: string & ClickHouseDecimal<18, 3>;
    highestPrice: string & ClickHouseDecimal<18, 3>;
}

export interface dns {
    timestamp: Date;
    domain: Key<string>;
    a: string & typia.tags.Format<"ipv4">;
    aaaa: string & typia.tags.Format<"ipv6">;
    cname: string;
}

export interface dns2 {
    timestamp: Date;
    domain: Key<string>;
    a: string & typia.tags.Format<"ipv4">;
    aaaa: string & typia.tags.Format<"ipv6">;
    cname: string;
}

export interface github_events {
    fileTime: Date;
    eventType: Key<EventType>;
    actorLogin: string;
    repoName: Key<string>;
    createdAt: Key<Date>;
    updatedAt: Date;
    action: Action;
    commentId: number & ClickHouseInt<"uint64">;
    body: string;
    path: string;
    position: number & ClickHouseInt<"int32">;
    line: number & ClickHouseInt<"int32">;
    ref: string;
    refType: RefType;
    creatorUserLogin: string;
    number: number & ClickHouseInt<"uint32">;
    title: string;
    labels: string[];
    state: State;
    locked: number & ClickHouseInt<"uint8">;
    assignee: string;
    assignees: string[];
    comments: number & ClickHouseInt<"uint32">;
    authorAssociation: AuthorAssociation;
    closedAt: Date;
    mergedAt: Date;
    mergeCommitSha: string;
    requestedReviewers: string[];
    requestedTeams: string[];
    headRef: string;
    headSha: string;
    baseRef: string;
    baseSha: string;
    merged: number & ClickHouseInt<"uint8">;
    mergeable: number & ClickHouseInt<"uint8">;
    rebaseable: number & ClickHouseInt<"uint8">;
    mergeableState: MergeableState;
    mergedBy: string;
    reviewComments: number & ClickHouseInt<"uint32">;
    maintainerCanModify: number & ClickHouseInt<"uint8">;
    commits: number & ClickHouseInt<"uint32">;
    additions: number & ClickHouseInt<"uint32">;
    deletions: number & ClickHouseInt<"uint32">;
    changedFiles: number & ClickHouseInt<"uint32">;
    diffHunk: string;
    originalPosition: number & ClickHouseInt<"uint32">;
    commitId: string;
    originalCommitId: string;
    pushSize: number & ClickHouseInt<"uint32">;
    pushDistinctSize: number & ClickHouseInt<"uint32">;
    memberLogin: string;
    releaseTagName: string;
    releaseName: string;
    reviewState: ReviewState;
}

export interface github_repos_history {
    time: Date;
    id: number & ClickHouseInt<"uint64">;
    fullName: string;
    ownerId: number & ClickHouseInt<"uint64">;
    ownerType: string;
    description: string;
    fork: boolean;
    createdAt: Date;
    updatedAt: Date;
    pushedAt: Date;
    homepage: string;
    size: number & ClickHouseInt<"uint64">;
    stargazersCount: number & ClickHouseInt<"uint32">;
    forksCount: number & ClickHouseInt<"uint32">;
    subscribersCount: number & ClickHouseInt<"uint32">;
    language: string;
    hasIssues: boolean;
    hasProjects: boolean;
    hasDownloads: boolean;
    hasWiki: boolean;
    hasPages: boolean;
    archived: boolean;
    disabled: boolean;
    isTemplate: boolean;
    allowForking: boolean;
    openIssuesCount: number & ClickHouseInt<"uint32">;
    licenseKey: string;
    topics: string[];
    defaultBranch: string;
    parentId: number & ClickHouseInt<"uint64">;
    parentFullName: string;
}

export interface github_users_history {
    time: Date;
    id: number & ClickHouseInt<"uint64">;
    login: string;
    type: string;
    siteAdmin: boolean;
    name: string;
    company: string;
    blog: string;
    location: string;
    email: string;
    hireable: boolean;
    bio: string;
    twitterUsername: string;
    publicRepos: number & ClickHouseInt<"int64">;
    publicGists: number & ClickHouseInt<"int64">;
    followers: number & ClickHouseInt<"int64">;
    following: number & ClickHouseInt<"int64">;
    createdAt: Date;
    updatedAt: Date;
}

export interface hackernews {
    id: Key<number & ClickHouseInt<"uint32">>;
    deleted: number & ClickHouseInt<"uint8">;
    type: Type;
    by: string;
    time: Date;
    text: string;
    dead: number & ClickHouseInt<"uint8">;
    parent: number & ClickHouseInt<"uint32">;
    poll: number & ClickHouseInt<"uint32">;
    kids: (number & ClickHouseInt<"uint32">)[];
    url: string;
    score: number & ClickHouseInt<"int32">;
    title: string;
    parts: (number & ClickHouseInt<"uint32">)[];
    descendants: number & ClickHouseInt<"int32">;
}

export interface hackernews_changes_items {
    updateTime: Key<Date>;
    id: Key<number & ClickHouseInt<"uint32">>;
    deleted: number & ClickHouseInt<"uint8">;
    type: Type;
    by: string;
    time: Date;
    text: string;
    dead: number & ClickHouseInt<"uint8">;
    parent: number & ClickHouseInt<"uint32">;
    poll: number & ClickHouseInt<"uint32">;
    kids: (number & ClickHouseInt<"uint32">)[];
    url: string;
    score: number & ClickHouseInt<"int32">;
    title: string;
    parts: (number & ClickHouseInt<"uint32">)[];
    descendants: number & ClickHouseInt<"int32">;
}

export interface hackernews_changes_profiles {
    updateTime: Key<Date>;
    about: string;
    created: Date;
    id: Key<string>;
    karma: number & ClickHouseInt<"int32">;
    submitted: (number & ClickHouseInt<"uint32">)[];
    submittedCount: number & ClickHouseInt<"uint32">;
}

export interface hackernews_history {
    updateTime: Date;
    id: Key<number & ClickHouseInt<"uint32">>;
    deleted: number & ClickHouseInt<"uint8">;
    type: Type;
    by: string;
    time: Date;
    text: string;
    dead: number & ClickHouseInt<"uint8">;
    parent: number & ClickHouseInt<"uint32">;
    poll: number & ClickHouseInt<"uint32">;
    kids: (number & ClickHouseInt<"uint32">)[];
    url: string;
    score: number & ClickHouseInt<"int32">;
    title: string;
    parts: (number & ClickHouseInt<"uint32">)[];
    descendants: number & ClickHouseInt<"int32">;
}

export interface hackernews_top {
    updateTime: Key<Date>;
    type: Type1;
    ids: (number & ClickHouseInt<"uint32">)[];
}

export interface hits {
    watchId: Key<number & ClickHouseInt<"int64">>;
    javaEnable: number & ClickHouseInt<"int16">;
    title: string;
    goodEvent: number & ClickHouseInt<"int16">;
    eventTime: Key<Date>;
    eventDate: Key<string & typia.tags.Format<"date"> & ClickHouseByteSize<2>>;
    counterId: Key<number & ClickHouseInt<"int32">>;
    clientIp: number & ClickHouseInt<"int32">;
    regionId: number & ClickHouseInt<"int32">;
    userId: Key<number & ClickHouseInt<"int64">>;
    counterClass: number & ClickHouseInt<"int16">;
    os: number & ClickHouseInt<"int16">;
    userAgent: number & ClickHouseInt<"int16">;
    url: string;
    referer: string;
    isRefresh: number & ClickHouseInt<"int16">;
    refererCategoryId: number & ClickHouseInt<"int16">;
    refererRegionId: number & ClickHouseInt<"int32">;
    urlCategoryId: number & ClickHouseInt<"int16">;
    urlRegionId: number & ClickHouseInt<"int32">;
    resolutionWidth: number & ClickHouseInt<"int16">;
    resolutionHeight: number & ClickHouseInt<"int16">;
    resolutionDepth: number & ClickHouseInt<"int16">;
    flashMajor: number & ClickHouseInt<"int16">;
    flashMinor: number & ClickHouseInt<"int16">;
    flashMinor2: string;
    netMajor: number & ClickHouseInt<"int16">;
    netMinor: number & ClickHouseInt<"int16">;
    userAgentMajor: number & ClickHouseInt<"int16">;
    userAgentMinor: string;
    cookieEnable: number & ClickHouseInt<"int16">;
    javascriptEnable: number & ClickHouseInt<"int16">;
    isMobile: number & ClickHouseInt<"int16">;
    mobilePhone: number & ClickHouseInt<"int16">;
    mobilePhoneModel: string;
    params: string;
    ipNetworkId: number & ClickHouseInt<"int32">;
    traficSourceId: number & ClickHouseInt<"int16">;
    searchEngineId: number & ClickHouseInt<"int16">;
    searchPhrase: string;
    advEngineId: number & ClickHouseInt<"int16">;
    isArtifical: number & ClickHouseInt<"int16">;
    windowClientWidth: number & ClickHouseInt<"int16">;
    windowClientHeight: number & ClickHouseInt<"int16">;
    clientTimeZone: number & ClickHouseInt<"int16">;
    clientEventTime: Date;
    silverlightVersion1: number & ClickHouseInt<"int16">;
    silverlightVersion2: number & ClickHouseInt<"int16">;
    silverlightVersion3: number & ClickHouseInt<"int32">;
    silverlightVersion4: number & ClickHouseInt<"int16">;
    pageCharset: string;
    codeVersion: number & ClickHouseInt<"int32">;
    isLink: number & ClickHouseInt<"int16">;
    isDownload: number & ClickHouseInt<"int16">;
    isNotBounce: number & ClickHouseInt<"int16">;
    fUniqId: number & ClickHouseInt<"int64">;
    originalUrl: string;
    hid: number & ClickHouseInt<"int32">;
    isOldCounter: number & ClickHouseInt<"int16">;
    isEvent: number & ClickHouseInt<"int16">;
    isParameter: number & ClickHouseInt<"int16">;
    dontCountHits: number & ClickHouseInt<"int16">;
    withHash: number & ClickHouseInt<"int16">;
    hitColor: string;
    localEventTime: Date;
    age: number & ClickHouseInt<"int16">;
    sex: number & ClickHouseInt<"int16">;
    income: number & ClickHouseInt<"int16">;
    interests: number & ClickHouseInt<"int16">;
    robotness: number & ClickHouseInt<"int16">;
    remoteIp: number & ClickHouseInt<"int32">;
    windowName: number & ClickHouseInt<"int32">;
    openerName: number & ClickHouseInt<"int32">;
    historyLength: number & ClickHouseInt<"int16">;
    browserLanguage: string;
    browserCountry: string;
    socialNetwork: string;
    socialAction: string;
    httpError: number & ClickHouseInt<"int16">;
    sendTiming: number & ClickHouseInt<"int32">;
    dnsTiming: number & ClickHouseInt<"int32">;
    connectTiming: number & ClickHouseInt<"int32">;
    responseStartTiming: number & ClickHouseInt<"int32">;
    responseEndTiming: number & ClickHouseInt<"int32">;
    fetchTiming: number & ClickHouseInt<"int32">;
    socialSourceNetworkId: number & ClickHouseInt<"int16">;
    socialSourcePage: string;
    paramPrice: number & ClickHouseInt<"int64">;
    paramOrderId: string;
    paramCurrency: string;
    paramCurrencyId: number & ClickHouseInt<"int16">;
    openstatServiceName: string;
    openstatCampaignId: string;
    openstatAdId: string;
    openstatSourceId: string;
    utmSource: string;
    utmMedium: string;
    utmCampaign: string;
    utmContent: string;
    utmTerm: string;
    fromTag: string;
    hasGclid: number & ClickHouseInt<"int16">;
    refererHash: number & ClickHouseInt<"int64">;
    urlHash: number & ClickHouseInt<"int64">;
    clid: number & ClickHouseInt<"int32">;
}

export interface hits2 {
    watchId: Key<number & ClickHouseInt<"int64">>;
    javaEnable: number & ClickHouseInt<"int16">;
    title: string;
    goodEvent: number & ClickHouseInt<"int16">;
    eventTime: Key<Date>;
    eventDate: Key<string & typia.tags.Format<"date"> & ClickHouseByteSize<2>>;
    counterId: Key<number & ClickHouseInt<"int32">>;
    clientIp: number & ClickHouseInt<"int32">;
    regionId: number & ClickHouseInt<"int32">;
    userId: Key<number & ClickHouseInt<"int64">>;
    counterClass: number & ClickHouseInt<"int16">;
    os: number & ClickHouseInt<"int16">;
    userAgent: number & ClickHouseInt<"int16">;
    url: string;
    referer: string;
    isRefresh: number & ClickHouseInt<"int16">;
    refererCategoryId: number & ClickHouseInt<"int16">;
    refererRegionId: number & ClickHouseInt<"int32">;
    urlCategoryId: number & ClickHouseInt<"int16">;
    urlRegionId: number & ClickHouseInt<"int32">;
    resolutionWidth: number & ClickHouseInt<"int16">;
    resolutionHeight: number & ClickHouseInt<"int16">;
    resolutionDepth: number & ClickHouseInt<"int16">;
    flashMajor: number & ClickHouseInt<"int16">;
    flashMinor: number & ClickHouseInt<"int16">;
    flashMinor2: string;
    netMajor: number & ClickHouseInt<"int16">;
    netMinor: number & ClickHouseInt<"int16">;
    userAgentMajor: number & ClickHouseInt<"int16">;
    userAgentMinor: string;
    cookieEnable: number & ClickHouseInt<"int16">;
    javascriptEnable: number & ClickHouseInt<"int16">;
    isMobile: number & ClickHouseInt<"int16">;
    mobilePhone: number & ClickHouseInt<"int16">;
    mobilePhoneModel: string;
    params: string;
    ipNetworkId: number & ClickHouseInt<"int32">;
    traficSourceId: number & ClickHouseInt<"int16">;
    searchEngineId: number & ClickHouseInt<"int16">;
    searchPhrase: string;
    advEngineId: number & ClickHouseInt<"int16">;
    isArtifical: number & ClickHouseInt<"int16">;
    windowClientWidth: number & ClickHouseInt<"int16">;
    windowClientHeight: number & ClickHouseInt<"int16">;
    clientTimeZone: number & ClickHouseInt<"int16">;
    clientEventTime: Date;
    silverlightVersion1: number & ClickHouseInt<"int16">;
    silverlightVersion2: number & ClickHouseInt<"int16">;
    silverlightVersion3: number & ClickHouseInt<"int32">;
    silverlightVersion4: number & ClickHouseInt<"int16">;
    pageCharset: string;
    codeVersion: number & ClickHouseInt<"int32">;
    isLink: number & ClickHouseInt<"int16">;
    isDownload: number & ClickHouseInt<"int16">;
    isNotBounce: number & ClickHouseInt<"int16">;
    fUniqId: number & ClickHouseInt<"int64">;
    originalUrl: string;
    hid: number & ClickHouseInt<"int32">;
    isOldCounter: number & ClickHouseInt<"int16">;
    isEvent: number & ClickHouseInt<"int16">;
    isParameter: number & ClickHouseInt<"int16">;
    dontCountHits: number & ClickHouseInt<"int16">;
    withHash: number & ClickHouseInt<"int16">;
    hitColor: string;
    localEventTime: Date;
    age: number & ClickHouseInt<"int16">;
    sex: number & ClickHouseInt<"int16">;
    income: number & ClickHouseInt<"int16">;
    interests: number & ClickHouseInt<"int16">;
    robotness: number & ClickHouseInt<"int16">;
    remoteIp: number & ClickHouseInt<"int32">;
    windowName: number & ClickHouseInt<"int32">;
    openerName: number & ClickHouseInt<"int32">;
    historyLength: number & ClickHouseInt<"int16">;
    browserLanguage: string;
    browserCountry: string;
    socialNetwork: string;
    socialAction: string;
    httpError: number & ClickHouseInt<"int16">;
    sendTiming: number & ClickHouseInt<"int32">;
    dnsTiming: number & ClickHouseInt<"int32">;
    connectTiming: number & ClickHouseInt<"int32">;
    responseStartTiming: number & ClickHouseInt<"int32">;
    responseEndTiming: number & ClickHouseInt<"int32">;
    fetchTiming: number & ClickHouseInt<"int32">;
    socialSourceNetworkId: number & ClickHouseInt<"int16">;
    socialSourcePage: string;
    paramPrice: number & ClickHouseInt<"int64">;
    paramOrderId: string;
    paramCurrency: string;
    paramCurrencyId: number & ClickHouseInt<"int16">;
    openstatServiceName: string;
    openstatCampaignId: string;
    openstatAdId: string;
    openstatSourceId: string;
    utmSource: string;
    utmMedium: string;
    utmCampaign: string;
    utmContent: string;
    utmTerm: string;
    fromTag: string;
    hasGclid: number & ClickHouseInt<"int16">;
    refererHash: number & ClickHouseInt<"int64">;
    urlHash: number & ClickHouseInt<"int64">;
    clid: number & ClickHouseInt<"int32">;
}

export interface hn_styles {
    name: Key<string>;
    vec: (number & ClickHouseInt<"uint32">)[];
}

export interface lineorder {
    loOrderkey: Key<number & ClickHouseInt<"uint32">>;
    loLinenumber: number & ClickHouseInt<"uint8">;
    loCustkey: number & ClickHouseInt<"uint32">;
    loPartkey: number & ClickHouseInt<"uint32">;
    loSuppkey: number & ClickHouseInt<"uint32">;
    loOrderdate: Key<string & typia.tags.Format<"date"> & ClickHouseByteSize<2>>;
    loOrderpriority: string;
    loShippriority: number & ClickHouseInt<"uint8">;
    loQuantity: number & ClickHouseInt<"uint8">;
    loExtendedprice: number & ClickHouseInt<"uint32">;
    loOrdtotalprice: number & ClickHouseInt<"uint32">;
    loDiscount: number & ClickHouseInt<"uint8">;
    loRevenue: number & ClickHouseInt<"uint32">;
    loSupplycost: number & ClickHouseInt<"uint32">;
    loTax: number & ClickHouseInt<"uint8">;
    loCommitdate: string & typia.tags.Format<"date"> & ClickHouseByteSize<2>;
    loShipmode: string;
}

export interface loc_stats {
    repoName: Key<string>;
    language: string;
    path: Key<string>;
    file: string;
    lines: number & ClickHouseInt<"uint32">;
    code: number & ClickHouseInt<"uint32">;
    comments: number & ClickHouseInt<"uint32">;
    blanks: number & ClickHouseInt<"uint32">;
    complexity: number & ClickHouseInt<"uint32">;
    bytes: number & ClickHouseInt<"uint64">;
}

export interface menu {
    id: Key<number & ClickHouseInt<"uint32">>;
    name: string;
    sponsor: string;
    event: string;
    venue: string;
    place: string;
    physicalDescription: string;
    occasion: string;
    notes: string;
    callNumber: string;
    keywords: string;
    language: string;
    date: string;
    location: string;
    locationType: string;
    currency: string;
    currencySymbol: string;
    status: string;
    pageCount: number & ClickHouseInt<"uint16">;
    dishCount: number & ClickHouseInt<"uint16">;
}

export interface menu_item {
    id: Key<number & ClickHouseInt<"uint32">>;
    menuPageId: number & ClickHouseInt<"uint32">;
    price: string & ClickHouseDecimal<18, 3>;
    highPrice: string & ClickHouseDecimal<18, 3>;
    dishId: number & ClickHouseInt<"uint32">;
    createdAt: Date;
    updatedAt: Date;
    xpos: number;
    ypos: number;
}

export interface menu_item_denorm {
    price: string & ClickHouseDecimal<18, 3>;
    highPrice: string & ClickHouseDecimal<18, 3>;
    createdAt: Key<Date>;
    updatedAt: Date;
    xpos: number;
    ypos: number;
    dishId: number & ClickHouseInt<"uint32">;
    dishName: Key<string>;
    dishDescription: string;
    dishMenusAppeared: number & ClickHouseInt<"uint32">;
    dishTimesAppeared: number & ClickHouseInt<"int32">;
    dishFirstAppeared: number & ClickHouseInt<"uint16">;
    dishLastAppeared: number & ClickHouseInt<"uint16">;
    dishLowestPrice: string & ClickHouseDecimal<18, 3>;
    dishHighestPrice: string & ClickHouseDecimal<18, 3>;
    menuId: number & ClickHouseInt<"uint32">;
    menuName: string;
    menuSponsor: string;
    menuEvent: string;
    menuVenue: string;
    menuPlace: string;
    menuPhysicalDescription: string;
    menuOccasion: string;
    menuNotes: string;
    menuCallNumber: string;
    menuKeywords: string;
    menuLanguage: string;
    menuDate: string;
    menuLocation: string;
    menuLocationType: string;
    menuCurrency: string;
    menuCurrencySymbol: string;
    menuStatus: string;
    menuPageCount: number & ClickHouseInt<"uint16">;
    menuDishCount: number & ClickHouseInt<"uint16">;
}

export interface menu_page {
    id: Key<number & ClickHouseInt<"uint32">>;
    menuId: number & ClickHouseInt<"uint32">;
    pageNumber: number & ClickHouseInt<"uint16">;
    imageId: string;
    fullHeight: number & ClickHouseInt<"uint16">;
    fullWidth: number & ClickHouseInt<"uint16">;
    uuid: string & typia.tags.Format<"uuid">;
}

export interface minicrawl {
    rank: number & ClickHouseInt<"uint32">;
    domain: Key<string>;
    log: string;
    content: string;
    size: number & ClickHouseInt<"uint64">;
    isUtf8: boolean;
    text: string;
}

export interface ontime {
    year: Key<number & ClickHouseInt<"uint16">>;
    quarter: Key<number & ClickHouseInt<"uint8">>;
    month: Key<number & ClickHouseInt<"uint8">>;
    dayofMonth: Key<number & ClickHouseInt<"uint8">>;
    dayOfWeek: number & ClickHouseInt<"uint8">;
    flightDate: Key<string & typia.tags.Format<"date"> & ClickHouseByteSize<2>>;
    reportingAirline: string;
    dotIdReportingAirline: number & ClickHouseInt<"int32">;
    iataCodeReportingAirline: Key<string>;
    tailNumber: string;
    flightNumberReportingAirline: string;
    originAirportId: number & ClickHouseInt<"int32">;
    originAirportSeqId: number & ClickHouseInt<"int32">;
    originCityMarketId: number & ClickHouseInt<"int32">;
    origin: string;
    originCityName: string;
    originState: string;
    originStateFips: string;
    originStateName: string;
    originWac: number & ClickHouseInt<"int32">;
    destAirportId: number & ClickHouseInt<"int32">;
    destAirportSeqId: number & ClickHouseInt<"int32">;
    destCityMarketId: number & ClickHouseInt<"int32">;
    dest: string;
    destCityName: string;
    destState: string;
    destStateFips: string;
    destStateName: string;
    destWac: number & ClickHouseInt<"int32">;
    crsDepTime: number & ClickHouseInt<"int32">;
    depTime: number & ClickHouseInt<"int32">;
    depDelay: number & ClickHouseInt<"int32">;
    depDelayMinutes: number & ClickHouseInt<"int32">;
    depDel15: number & ClickHouseInt<"int32">;
    departureDelayGroups: string;
    depTimeBlk: string;
    taxiOut: number & ClickHouseInt<"int32">;
    wheelsOff: string;
    wheelsOn: string;
    taxiIn: number & ClickHouseInt<"int32">;
    crsArrTime: number & ClickHouseInt<"int32">;
    arrTime: number & ClickHouseInt<"int32">;
    arrDelay: number & ClickHouseInt<"int32">;
    arrDelayMinutes: number & ClickHouseInt<"int32">;
    arrDel15: number & ClickHouseInt<"int32">;
    arrivalDelayGroups: string;
    arrTimeBlk: string;
    cancelled: number & ClickHouseInt<"int8">;
    cancellationCode: string;
    diverted: number & ClickHouseInt<"int8">;
    crsElapsedTime: number & ClickHouseInt<"int32">;
    actualElapsedTime: number & ClickHouseInt<"int32">;
    airTime: number & ClickHouseInt<"int32">;
    flights: number & ClickHouseInt<"int32">;
    distance: number & ClickHouseInt<"int32">;
    distanceGroup: number & ClickHouseInt<"int8">;
    carrierDelay: number & ClickHouseInt<"int32">;
    weatherDelay: number & ClickHouseInt<"int32">;
    nasDelay: number & ClickHouseInt<"int32">;
    securityDelay: number & ClickHouseInt<"int32">;
    lateAircraftDelay: number & ClickHouseInt<"int32">;
    firstDepTime: number & ClickHouseInt<"int16">;
    totalAddGTime: number & ClickHouseInt<"int16">;
    longestAddGTime: number & ClickHouseInt<"int16">;
    divAirportLandings: number & ClickHouseInt<"int8">;
    divReachedDest: number & ClickHouseInt<"int8">;
    divActualElapsedTime: number & ClickHouseInt<"int16">;
    divArrDelay: number & ClickHouseInt<"int16">;
    divDistance: number & ClickHouseInt<"int16">;
    div1Airport: string;
    div1AirportId: number & ClickHouseInt<"int32">;
    div1AirportSeqId: number & ClickHouseInt<"int32">;
    div1WheelsOn: number & ClickHouseInt<"int16">;
    div1TotalGTime: number & ClickHouseInt<"int16">;
    div1LongestGTime: number & ClickHouseInt<"int16">;
    div1WheelsOff: number & ClickHouseInt<"int16">;
    div1TailNum: string;
    div2Airport: string;
    div2AirportId: number & ClickHouseInt<"int32">;
    div2AirportSeqId: number & ClickHouseInt<"int32">;
    div2WheelsOn: number & ClickHouseInt<"int16">;
    div2TotalGTime: number & ClickHouseInt<"int16">;
    div2LongestGTime: number & ClickHouseInt<"int16">;
    div2WheelsOff: number & ClickHouseInt<"int16">;
    div2TailNum: string;
    div3Airport: string;
    div3AirportId: number & ClickHouseInt<"int32">;
    div3AirportSeqId: number & ClickHouseInt<"int32">;
    div3WheelsOn: number & ClickHouseInt<"int16">;
    div3TotalGTime: number & ClickHouseInt<"int16">;
    div3LongestGTime: number & ClickHouseInt<"int16">;
    div3WheelsOff: number & ClickHouseInt<"int16">;
    div3TailNum: string;
    div4Airport: string;
    div4AirportId: number & ClickHouseInt<"int32">;
    div4AirportSeqId: number & ClickHouseInt<"int32">;
    div4WheelsOn: number & ClickHouseInt<"int16">;
    div4TotalGTime: number & ClickHouseInt<"int16">;
    div4LongestGTime: number & ClickHouseInt<"int16">;
    div4WheelsOff: number & ClickHouseInt<"int16">;
    div4TailNum: string;
    div5Airport: string;
    div5AirportId: number & ClickHouseInt<"int32">;
    div5AirportSeqId: number & ClickHouseInt<"int32">;
    div5WheelsOn: number & ClickHouseInt<"int16">;
    div5TotalGTime: number & ClickHouseInt<"int16">;
    div5LongestGTime: number & ClickHouseInt<"int16">;
    div5WheelsOff: number & ClickHouseInt<"int16">;
    div5TailNum: string;
}

export interface opensky {
    callsign: Key<string>;
    number: string;
    icao24: string;
    registration: string;
    typecode: string;
    origin: Key<string>;
    destination: Key<string>;
    firstseen: Date;
    lastseen: Date;
    day: Date;
    latitude1: number;
    longitude1: number;
    altitude1: number;
    latitude2: number;
    longitude2: number;
    altitude2: number;
}

export interface pypi {
    projectName: Key<string>;
    projectVersion: string;
    projectRelease: string;
    uploadedOn: string & typia.tags.Format<"date-time"> & ClickHousePrecision<3>;
    path: Key<string>;
    archivePath: string;
    size: number & ClickHouseInt<"uint64">;
    hash: string;
    skipReason: string;
    lines: number & ClickHouseInt<"uint64">;
    repository: number & ClickHouseInt<"uint32">;
}

export interface query_metrics_v2 {
    eventDate: Key<string & typia.tags.Format<"date"> & ClickHouseByteSize<2>>;
    eventTime: Date;
    prNumber: number & ClickHouseInt<"uint32">;
    oldSha: string;
    newSha: string;
    test: string;
    queryIndex: number & ClickHouseInt<"uint32">;
    queryDisplayName: string;
    metric: string;
    oldValue: number;
    newValue: number;
    diff: number;
    statThreshold: number;
}

export interface rdns {
    timestamp: Date;
    address: Key<string & typia.tags.Format<"ipv4">>;
    domain: string;
}

export interface recipes {
    title: Key<string>;
    ingredients: string[];
    directions: string[];
    link: string;
    source: string;
    ner: string[];
}

export interface repos {
    fullName: Key<string>;
    ownerType: string;
    description: string;
    fork: boolean;
    createdAt: Date;
    updatedAt: Date;
    pushedAt: Date;
    homepage: string;
    size: number & ClickHouseInt<"uint64">;
    stargazersCount: number & ClickHouseInt<"uint32">;
    forksCount: number & ClickHouseInt<"uint32">;
    subscribersCount: number & ClickHouseInt<"uint32">;
    language: string;
    hasIssues: boolean;
    hasProjects: boolean;
    hasDownloads: boolean;
    hasWiki: boolean;
    hasPages: boolean;
    archived: boolean;
    disabled: boolean;
    isTemplate: boolean;
    allowForking: boolean;
    openIssuesCount: number & ClickHouseInt<"uint32">;
    licenseKey: string;
    topics: string[];
    defaultBranch: string;
}

export interface repos_raw {
    data: string;
}

export interface run_attributes_v1 {
    oldSha: Key<string>;
    newSha: Key<string>;
    metric: string;
    metricValue: string;
}

export interface stock {
    symbol: Key<string>;
    date: Key<string & typia.tags.Format<"date"> & ClickHouseByteSize<2>>;
    price: string & ClickHouseDecimal<9, 3>;
    volume: number & ClickHouseInt<"uint32">;
    open: string & ClickHouseDecimal<9, 3>;
    low: string & ClickHouseDecimal<9, 3>;
    high: string & ClickHouseDecimal<9, 3>;
}

export interface tranco {
    date: Key<string & typia.tags.Format<"date"> & ClickHouseByteSize<2>>;
    rank: number & ClickHouseInt<"uint32">;
    domain: Key<string>;
}

export interface trips {
    tripId: number & ClickHouseInt<"uint32">;
    vendorId: VendorId;
    pickupDate: string & typia.tags.Format<"date"> & ClickHouseByteSize<2>;
    pickupDatetime: Key<Date>;
    dropoffDate: string & typia.tags.Format<"date"> & ClickHouseByteSize<2>;
    dropoffDatetime: Date;
    storeAndFwdFlag: number & ClickHouseInt<"uint8">;
    rateCodeId: number & ClickHouseInt<"uint8">;
    pickupLongitude: number;
    pickupLatitude: number;
    dropoffLongitude: number;
    dropoffLatitude: number;
    passengerCount: number & ClickHouseInt<"uint8">;
    tripDistance: number;
    fareAmount: number & typia.tags.Type<"float">;
    extra: number & typia.tags.Type<"float">;
    mtaTax: number & typia.tags.Type<"float">;
    tipAmount: number & typia.tags.Type<"float">;
    tollsAmount: number & typia.tags.Type<"float">;
    ehailFee: number & typia.tags.Type<"float">;
    improvementSurcharge: number & typia.tags.Type<"float">;
    totalAmount: number & typia.tags.Type<"float">;
    paymentType: PaymentType;
    tripType: number & ClickHouseInt<"uint8">;
    pickup: string;
    dropoff: string;
    cabType: CabType;
    pickupNyct2010Gid: number & ClickHouseInt<"int8">;
    pickupCtlabel: number & typia.tags.Type<"float">;
    pickupBorocode: number & ClickHouseInt<"int8">;
    pickupCt2010: string;
    pickupBoroct2010: string;
    pickupCdeligibil: string;
    pickupNtacode: string;
    pickupNtaname: string;
    pickupPuma: number & ClickHouseInt<"uint16">;
    dropoffNyct2010Gid: number & ClickHouseInt<"uint8">;
    dropoffCtlabel: number & typia.tags.Type<"float">;
    dropoffBorocode: number & ClickHouseInt<"uint8">;
    dropoffCt2010: string;
    dropoffBoroct2010: string;
    dropoffCdeligibil: string;
    dropoffNtacode: string;
    dropoffNtaname: string;
    dropoffPuma: number & ClickHouseInt<"uint16">;
}

export interface uk_price_paid {
    price: number & ClickHouseInt<"uint32">;
    date: string & typia.tags.Format<"date"> & ClickHouseByteSize<2>;
    postcode1: Key<string>;
    postcode2: Key<string>;
    type: Type2;
    isNew: number & ClickHouseInt<"uint8">;
    duration: Duration;
    addr1: Key<string>;
    addr2: Key<string>;
    street: string;
    locality: string;
    town: string;
    district: string;
    county: string;
}

export interface version_history {
    checkStartTime: Key<Date>;
    pullRequestNumber: number & ClickHouseInt<"uint32">;
    pullRequestUrl: string;
    commitSha: string;
    parentCommitsSha: string[];
    commitUrl: string;
    version: string;
    dockerTag: string;
    gitRef: string;
}

export interface wikistat {
    time: Key<Date>;
    project: string;
    subproject: string;
    path: Key<string>;
    hits: number & ClickHouseInt<"uint64">;
}

export interface workflow_jobs {
    id: Key<number & ClickHouseInt<"uint64">>;
    runId: number & ClickHouseInt<"uint64">;
    workflowName: string;
    headBranch: string;
    runUrl: string;
    runAttempt: number & ClickHouseInt<"uint16">;
    nodeId: string;
    headSha: string;
    url: string;
    htmlUrl: string;
    status: Status;
    conclusion: string;
    startedAt: Date;
    completedAt: Date;
    name: string;
    steps: number & ClickHouseInt<"uint16">;
    checkRunUrl: string;
    labels: string[];
    runnerId: number & ClickHouseInt<"uint64">;
    runnerName: string;
    runnerGroupId: number & ClickHouseInt<"uint64">;
    runnerGroupName: string;
    repository: string;
    updatedAt: Key<Date>;
}

export const ActorsPipeline = new IngestPipeline<actors>("actors", {
    table: true,
    stream: true,
    ingest: true,
});

export const BenchmarkResultsPipeline = new IngestPipeline<benchmark_results>("benchmark_results", {
    table: true,
    stream: true,
    ingest: true,
});

export const BenchmarkRunsPipeline = new IngestPipeline<benchmark_runs>("benchmark_runs", {
    table: true,
    stream: true,
    ingest: true,
});

export const CellTowersPipeline = new IngestPipeline<cell_towers>("cell_towers", {
    table: true,
    stream: true,
    ingest: true,
});

export const ChecksPipeline = new IngestPipeline<checks>("checks", {
    table: true,
    stream: true,
    ingest: true,
});

export const CiscoUmbrellaPipeline = new IngestPipeline<cisco_umbrella>("cisco_umbrella", {
    table: true,
    stream: true,
    ingest: true,
});

export const CovidPipeline = new IngestPipeline<covid>("covid", {
    table: true,
    stream: true,
    ingest: true,
});

export const DishPipeline = new IngestPipeline<dish>("dish", {
    table: true,
    stream: true,
    ingest: true,
});

export const DnsPipeline = new IngestPipeline<dns>("dns", {
    table: true,
    stream: true,
    ingest: true,
});

export const Dns2Pipeline = new IngestPipeline<dns2>("dns2", {
    table: true,
    stream: true,
    ingest: true,
});

export const GithubEventsPipeline = new IngestPipeline<github_events>("github_events", {
    table: true,
    stream: true,
    ingest: true,
});

export const GithubReposHistoryPipeline = new IngestPipeline<github_repos_history>("github_repos_history", {
    table: true,
    stream: true,
    ingest: true,
});

export const GithubUsersHistoryPipeline = new IngestPipeline<github_users_history>("github_users_history", {
    table: true,
    stream: true,
    ingest: true,
});

export const HackernewsPipeline = new IngestPipeline<hackernews>("hackernews", {
    table: true,
    stream: true,
    ingest: true,
});

export const HackernewsChangesItemsPipeline = new IngestPipeline<hackernews_changes_items>("hackernews_changes_items", {
    table: true,
    stream: true,
    ingest: true,
});

export const HackernewsChangesProfilesPipeline = new IngestPipeline<hackernews_changes_profiles>("hackernews_changes_profiles", {
    table: true,
    stream: true,
    ingest: true,
});

export const HackernewsHistoryPipeline = new IngestPipeline<hackernews_history>("hackernews_history", {
    table: true,
    stream: true,
    ingest: true,
});

export const HackernewsTopPipeline = new IngestPipeline<hackernews_top>("hackernews_top", {
    table: true,
    stream: true,
    ingest: true,
});

export const HitsPipeline = new IngestPipeline<hits>("hits", {
    table: true,
    stream: true,
    ingest: true,
});

export const Hits2Pipeline = new IngestPipeline<hits2>("hits2", {
    table: true,
    stream: true,
    ingest: true,
});

export const HnStylesPipeline = new IngestPipeline<hn_styles>("hn_styles", {
    table: true,
    stream: true,
    ingest: true,
});

export const LineorderPipeline = new IngestPipeline<lineorder>("lineorder", {
    table: true,
    stream: true,
    ingest: true,
});

export const LocStatsPipeline = new IngestPipeline<loc_stats>("loc_stats", {
    table: true,
    stream: true,
    ingest: true,
});

export const MenuPipeline = new IngestPipeline<menu>("menu", {
    table: true,
    stream: true,
    ingest: true,
});

export const MenuItemPipeline = new IngestPipeline<menu_item>("menu_item", {
    table: true,
    stream: true,
    ingest: true,
});

export const MenuItemDenormPipeline = new IngestPipeline<menu_item_denorm>("menu_item_denorm", {
    table: true,
    stream: true,
    ingest: true,
});

export const MenuPagePipeline = new IngestPipeline<menu_page>("menu_page", {
    table: true,
    stream: true,
    ingest: true,
});

export const MinicrawlPipeline = new IngestPipeline<minicrawl>("minicrawl", {
    table: true,
    stream: true,
    ingest: true,
});

export const OntimePipeline = new IngestPipeline<ontime>("ontime", {
    table: true,
    stream: true,
    ingest: true,
});

export const OpenskyPipeline = new IngestPipeline<opensky>("opensky", {
    table: true,
    stream: true,
    ingest: true,
});

export const PypiPipeline = new IngestPipeline<pypi>("pypi", {
    table: true,
    stream: true,
    ingest: true,
});

export const QueryMetricsV2Pipeline = new IngestPipeline<query_metrics_v2>("query_metrics_v2", {
    table: true,
    stream: true,
    ingest: true,
});

export const RdnsPipeline = new IngestPipeline<rdns>("rdns", {
    table: true,
    stream: true,
    ingest: true,
});

export const RecipesPipeline = new IngestPipeline<recipes>("recipes", {
    table: true,
    stream: true,
    ingest: true,
});

export const ReposPipeline = new IngestPipeline<repos>("repos", {
    table: true,
    stream: true,
    ingest: true,
});

export const ReposRawPipeline = new IngestPipeline<repos_raw>("repos_raw", {
    table: true,
    stream: true,
    ingest: true,
});

export const RunAttributesV1Pipeline = new IngestPipeline<run_attributes_v1>("run_attributes_v1", {
    table: true,
    stream: true,
    ingest: true,
});

export const StockPipeline = new IngestPipeline<stock>("stock", {
    table: true,
    stream: true,
    ingest: true,
});

export const TrancoPipeline = new IngestPipeline<tranco>("tranco", {
    table: true,
    stream: true,
    ingest: true,
});

export const TripsPipeline = new IngestPipeline<trips>("trips", {
    table: true,
    stream: true,
    ingest: true,
});

export const UkPricePaidPipeline = new IngestPipeline<uk_price_paid>("uk_price_paid", {
    table: true,
    stream: true,
    ingest: true,
});

export const VersionHistoryPipeline = new IngestPipeline<version_history>("version_history", {
    table: true,
    stream: true,
    ingest: true,
});

export const WikistatPipeline = new IngestPipeline<wikistat>("wikistat", {
    table: true,
    stream: true,
    ingest: true,
});

export const WorkflowJobsPipeline = new IngestPipeline<workflow_jobs>("workflow_jobs", {
    table: true,
    stream: true,
    ingest: true,
});


