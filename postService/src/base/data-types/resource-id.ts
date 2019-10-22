/**
 * Represent the way resource id instance should be handled
 */
export abstract class ResourceIdConstuctor {

	/**
	 * Creates resource ID
	 */
	public abstract createResourceIdInstance(resourceIdValue: string): IResourceId;

	/**
	 * Check if resourceID has a valid format
	 */
	public abstract isValidFormat(resourceIdValue: string): boolean;

}

/**
 * Interface that represents abstract
 * logic to work with resource ids.
 */
export interface IResourceId {

	/**
	 * Represent id as string (will be displayed to end users)
	 */
	toString(): string;

	/**
	 * Check if resource exists
	 */
	doesExist?(): Promise<true | false>; 

}

export abstract class IResourceId implements IResourceId {}
