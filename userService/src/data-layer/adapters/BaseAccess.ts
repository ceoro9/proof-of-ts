enum AccessState {
	PENDING,
	FULFILLED,
	REJECTED
}

type OnFulfilledCb = (result: any)  => void;
type OnRejectedCb  = (error: Error) => void;

export interface ItemChainCb {
	onFulfilled: OnFulfilledCb;
	onRejected:  OnRejectedCb;
}

export class PromiseAccess {

	protected state: AccessState       = AccessState.PENDING;
	protected resultValue: any         = undefined;
	protected chainCbs: Array<ItemChainCb> = [];

	protected resolve(result: any) {

		if (this.state !== AccessState.PENDING) {
			return;
		}

		this.state = AccessState.FULFILLED;
		this.resultValue = result;

		for (const { onFulfilled } of this.chainCbs) {
			onFulfilled(this.resultValue);
		}
	}

	protected reject(error: Error) {

		if (this.state !== AccessState.PENDING) {
			return;
		}

		this.state = AccessState.FULFILLED;
		this.resultValue = error;

		for (const { onRejected } of this.chainCbs) {
			onRejected(this.resultValue);
		}
	}

	public then(onFulfilled: OnFulfilledCb, onRejected: OnRejectedCb) {
		if (this.state === AccessState.FULFILLED) {
			onFulfilled(this.resultValue);
		} else if (this.state === AccessState.REJECTED) {
			onRejected(this.resultValue);
		} else {
			this.chainCbs.push({ onFulfilled, onRejected });
		}
	}

} 
