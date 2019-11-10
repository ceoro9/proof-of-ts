
import ProtoBuf from 'protobufjs';


export function packMessage(root: ProtoBuf.Root) {
	const Any = root.lookupType('Any');
	return (message: ProtoBuf.Message, prefix: string) => {
		return {
			type_url: `Authorization.${prefix}`,
			value:    Any.encode(message).finish(),
		};
	};
}


export function unpackMessage(root: ProtoBuf.Root) {
	const Any = root.lookupType('Any');
	return (message: Uint8Array) => {
		return Any.decode(message).toJSON();
	};
};


export function isAnyProtosTypeObject(obj: any) {
	return obj.type_url && obj.value;
} 
