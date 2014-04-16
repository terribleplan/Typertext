module Typertext.Transport {
    export interface GenericTransport {
        Send(): void;
        Destroy(): void;
    }
}