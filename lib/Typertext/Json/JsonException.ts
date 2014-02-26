module Typertext.Json {
    export class JsonException extends Typertext.BaseException<void> {
        constructor(message:string, code:number) {
            super(message, code, null);
        }
    }
}