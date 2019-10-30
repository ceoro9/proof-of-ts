import * as grpc from 'grpc';
import { Observable } from 'rxjs';
/** Namespace Authorization. */
export namespace Authorization {

    /** Contains all the RPC service clients. */
    export interface ClientFactory {

        /**
         * Returns the ResourcePolicyService service client.
         */
        getResourcePolicyService(): Authorization.ResourcePolicyService;
    }

    /** Builder for an RPC service server. */
    export interface ServerBuilder {

        /**
         * Adds a ResourcePolicyService service implementation.
         * @param impl ResourcePolicyService service implementation
         */
        addResourcePolicyService(impl: Authorization.ResourcePolicyService): Authorization.ServerBuilder;
    }

    /** Properties of a ResourcePolicy. */
    export interface ResourcePolicy {

        /** ResourcePolicy resourceId */
        resourceId?: (string|null);

        /** ResourcePolicy resourceType */
        resourceType?: (string|null);
    }

    /** Properties of a ResourceAction. */
    export interface ResourceAction {

        /** ResourceAction actionId */
        actionId?: (string|null);

        /** ResourceAction resourceId */
        resourceId?: (string|null);

        /** ResourceAction name */
        name?: (string|null);
    }

    /** Properties of a DoesUserHasPermissionRequest. */
    export interface DoesUserHasPermissionRequest {

        /** DoesUserHasPermissionRequest resourceId */
        resourceId?: (string|null);

        /** DoesUserHasPermissionRequest actionId */
        actionId?: (string|null);

        /** DoesUserHasPermissionRequest userId */
        userId?: (string|null);
    }

    /** Properties of a DoesUserHasPermissionResponse. */
    export interface DoesUserHasPermissionResponse {

        /** DoesUserHasPermissionResponse result */
        result?: (boolean|null);
    }

    /** Properties of a GetResourcePolicyByIdRequest. */
    export interface GetResourcePolicyByIdRequest {

        /** GetResourcePolicyByIdRequest resourceId */
        resourceId?: (string|null);
    }

    /** Constructs a new ResourcePolicyService service. */
    export interface ResourcePolicyService {

        /**
         * Calls DoesUserHasPermission.
         * @param request DoesUserHasPermissionRequest message or plain object
         * @param metadata Optional metadata
         * @returns Promise
         */
        doesUserHasPermission(request: Authorization.DoesUserHasPermissionRequest, metadata?: grpc.Metadata): Observable<Authorization.DoesUserHasPermissionResponse>;

        /**
         * Calls GetResourcePolicyById.
         * @param request GetResourcePolicyByIdRequest message or plain object
         * @param metadata Optional metadata
         * @returns Promise
         */
        getResourcePolicyById(request: Authorization.GetResourcePolicyByIdRequest, metadata?: grpc.Metadata): Observable<Authorization.ResourcePolicy>;
    }
}
