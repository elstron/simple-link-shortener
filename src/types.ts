export type Env = {
    Bindings: Bindings
}

export type Bindings = {
    kv: KVNamespace
    DB: D1Database
    database_id: string
    database_name: string
    JWT_SECRET: string;
    OAUTH_STATE: DurableObjectNamespace;
    GOOGLE_CLIENT_ID: string;
    GOOGLE_CLIENT_SECRET: string;
}
