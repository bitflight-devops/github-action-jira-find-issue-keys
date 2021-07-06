export declare type SprintBean = Sprint;
export interface Sprint {
    id: number;
    self?: string;
    state: string | Sprint.State;
    name: string;
    startDate?: string;
    endDate?: string;
    completeDate?: string;
    originBoardId?: number;
    goal?: string;
}
export declare namespace Sprint {
    enum State {
        Future = "future",
        Active = "active",
        Closed = "closed"
    }
}
