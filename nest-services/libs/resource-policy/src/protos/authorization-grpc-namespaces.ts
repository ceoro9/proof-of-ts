import * as grpc from 'grpc';
import { Observable } from 'rxjs';
/** Namespace Authorization. */
export namespace Authorization {

    /** Contains all the RPC service clients. */
    export interface ClientFactory {

        /**
         * Returns the ResourcePermissionsService service client.
         */
        getResourcePermissionsService(): Authorization.ResourcePermissionsService;
    }

    /** Builder for an RPC service server. */
    export interface ServerBuilder {

        /**
         * Adds a ResourcePermissionsService service implementation.
         * @param impl ResourcePermissionsService service implementation
         */
        addResourcePermissionsService(impl: Authorization.ResourcePermissionsService): Authorization.ServerBuilder;
    }

    /** Properties of a ResourceType. */
    export interface ResourceType {

        /** ResourceType id */
        id?: (string|null);

        /** ResourceType name */
        name?: (string|null);

        /** ResourceType availableActions */
        availableActions?: (Authorization.ResourceAction[]|null);
    }

    /** Properties of a ResourceAction. */
    export interface ResourceAction {

        /** ResourceAction name */
        name?: (string|null);
    }

    /** Properties of a ResourceInstance. */
    export interface ResourceInstance {

        /** ResourceInstance resourceId */
        resourceId?: (string|null);

        /** ResourceInstance typeId */
        typeId?: (string|null);

        /** ResourceInstance ownerId */
        ownerId?: (string|null);

        /** ResourceInstance policy */
        policy?: (Authorization.ResourcePolicy|null);
    }

    /** Properties of a ResourcePolicy. */
    export interface ResourcePolicy {

        /** ResourcePolicy documents */
        documents?: (Authorization.ResourcePolicyDocument[]|null);
    }

    /** ResourcePolicyDocumentType enum. */
    export enum ResourcePolicyDocumentType {
        GLYPH_SYMBOL = 1,
        ACTIONS_LIST = 2
    }

    /** Properties of a ResourcePolicyDocument. */
    export interface ResourcePolicyDocument {

        /** ResourcePolicyDocument identityId */
        identityId?: (string|null);

        /** ResourcePolicyDocument policyDocumentType */
        policyDocumentType?: (Authorization.ResourcePolicyDocumentType|null);

        /** ResourcePolicyDocument policyDocumentValue */
        policyDocumentValue?: (Authorization.AnyJson|null);
    }

    /** Properties of an AnyJson. */
    export interface AnyJson {

        /** AnyJson jsonSerializedValue */
        jsonSerializedValue?: (string|null);
    }

    /** Properties of an IsActionPermittedRequest. */
    export interface IsActionPermittedRequest {

        /** IsActionPermittedRequest resourceId */
        resourceId?: (string|null);

        /** IsActionPermittedRequest actionName */
        actionName?: (string|null);

        /** IsActionPermittedRequest identityId */
        identityId?: (string|null);
    }

    /** Properties of an IsActionPermittedResponse. */
    export interface IsActionPermittedResponse {

        /** IsActionPermittedResponse result */
        result?: (boolean|null);
    }

    /** Properties of a ResourceById. */
    export interface ResourceById {

        /** ResourceById resourceId */
        resourceId?: (string|null);
    }

    /** Constructs a new ResourcePermissionsService service. */
    export interface ResourcePermissionsService {

        /**
         * Calls GetResourcePolicyByResourceId.
         * @param request ResourceById message or plain object
         * @param metadata Optional metadata
         * @returns Promise
         */
        getResourcePolicyByResourceId(request: Authorization.ResourceById, metadata?: grpc.Metadata): Observable<Authorization.ResourcePolicy>;

        /**
         * Calls CreateResourceInstance.
         * @param request ResourceInstance message or plain object
         * @param metadata Optional metadata
         * @returns Promise
         */
        createResourceInstance(request: Authorization.ResourceInstance, metadata?: grpc.Metadata): Observable<Authorization.ResourceInstance>;

        /**
         * Calls CreateResourceType.
         * @param request ResourceType message or plain object
         * @param metadata Optional metadata
         * @returns Promise
         */
        createResourceType(request: Authorization.ResourceType, metadata?: grpc.Metadata): Observable<Authorization.ResourceType>;

        /**
         * Calls IsActionPermitted.
         * @param request IsActionPermittedRequest message or plain object
         * @param metadata Optional metadata
         * @returns Promise
         */
        isActionPermitted(request: Authorization.IsActionPermittedRequest, metadata?: grpc.Metadata): Observable<Authorization.IsActionPermittedResponse>;
    }
}
