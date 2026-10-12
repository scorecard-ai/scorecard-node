// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

/**
 * The identity and organization of the caller.
 */
export interface Whoami {
  /**
   * How the request authenticated: `jwt` (Scorecard web session),
   * `personal-api-key`, `org-api-key`, or `oauth-key` (OAuth token, for example from
   * the MCP server).
   */
  authType: 'jwt' | 'personal-api-key' | 'org-api-key' | 'oauth-key';

  /**
   * The organizations this credential can act in. Pass one of these IDs in the
   * `X-Scorecard-Org-Id` header to switch organization. A JWT or an org API key
   * lists only its own organization.
   */
  memberships: Array<Whoami.Membership>;

  /**
   * The organization this request acts in.
   */
  org: Whoami.Org;

  /**
   * The ID of the organization this request acts in. Set it with the
   * `X-Scorecard-Org-Id` header.
   */
  orgId: string;

  /**
   * The ID of the user. For an org API key, the user who created the key.
   */
  userId: string;
}

export namespace Whoami {
  export interface Membership {
    /**
     * The ID of the organization.
     */
    id: string;

    /**
     * The name of the organization.
     */
    name: string;

    /**
     * The user's role in the organization, for example `org:admin`. Null for a JWT or
     * an org API key, which list only their own organization.
     */
    role: string | null;
  }

  /**
   * The organization this request acts in.
   */
  export interface Org {
    /**
     * The ID of the organization.
     */
    id: string;

    /**
     * The name of the organization.
     */
    name: string;

    /**
     * The URL slug of the organization.
     */
    slug: string;
  }
}

export declare namespace TopLevel {
  export { type Whoami as Whoami };
}
