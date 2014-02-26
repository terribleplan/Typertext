module Typertext {
    export interface GenericResponseHandler<T extends GenericResponse<any>> {
        (response:T): void;
    }
}