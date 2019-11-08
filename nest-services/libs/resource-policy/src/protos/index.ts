import ProtoBuf from 'protobufjs';
import { packMessage, unpackMessage } from './base';


export const AuthorizationBuilder = ProtoBuf.loadSync('/home/ceoro9/ts_practive/proof-of-ts/nest-services/libs/resource-policy/protos/authorization.proto');

export const packAuthorizationMessage = packMessage(AuthorizationBuilder);

export const unpackAuthorizationMessage = unpackMessage(AuthorizationBuilder);


export * from './authorization-grpc-namespaces';
export * from './base';
