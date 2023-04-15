export interface IQueue<A> {
    push(elem: A): void  
    pop(): A | undefined
    toArray(): Readonly<A[]>
    length: number
}

export class Queue<A> implements IQueue<A> {
    private in: A[] = [];
    private out: A[] = [];

    push(elem: A): void {
        this.in.push(elem);
    }

    pop(): A {
        if(!this.out.length && !this.in.length) {
            return undefined;
        }
        if(!this.out.length) {
            this.out = this.in.reverse()
            this.in = [];
        }

        return this.out.pop();
    }

    toArray(): readonly A[] {
        if(this.in.length) {
          this.out = [...this.in.reverse(), ...this.out]
          this.in=[]
        }
        return this.out;
    }

    get length(): number {
        return this.in.length + this.out.length;
    }

}

