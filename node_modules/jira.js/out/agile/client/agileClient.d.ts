import { BaseClient } from '../../clients';
import { Backlog, Board, Builds, Deployments, DevelopmentInformation, Epic, FeatureFlags, Issue, Project, RemoteLinks, Sprint } from '..';
export declare class AgileClient extends BaseClient {
    backlog: Backlog;
    board: Board;
    builds: Builds;
    deployments: Deployments;
    developmentInformation: DevelopmentInformation;
    epic: Epic;
    featureFlags: FeatureFlags;
    issue: Issue;
    project: Project;
    remoteLinks: RemoteLinks;
    sprint: Sprint;
}
