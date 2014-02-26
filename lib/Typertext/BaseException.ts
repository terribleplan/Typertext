module Typertext {
    export class BaseException<T> {
        private code:number;
        private custom:T;
        private message:string;

        constructor(message:string, code:number, custom:T) {
            this.message = message;
            this.code = code;
            this.custom = custom;
        }

        public GetCode():number {
            return this.code;
        }

        public GetMessage():string {
            return this.message;
        }

        public GetCustom():T {
            return this.custom;
        }
    }
}