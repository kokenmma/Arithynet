package main

import (
	"fmt"
	"github.com/Arithynet/latex/pkg/tikzCompile"
)

func main() {
	svg := tikz.TikzWrapper(`
\begin{tikzpicture}[->,>=stealth',shorten >=1pt,auto,node distance=3cm,
                    semithick]
  %\tikzstyle{every state}=[]

    \node[initial,state]            (p)                     {$p$};
    \node[state]                    (pq)[right of=p]        {$p,q$};
    \node[state,accepting]          (pqrs)[right of=pq]     {$p,q,r,s$};
    \node[state,accepting]          (pt)[below of=pq]     {$p,t$};

    \path
        (p)     edge                    node {0} (pq)
                edge [loop above]       node {1} (p)
        (pq)    edge                    node {0} (pqrs)
                edge [bend left]        node {1} (pt)
        (pqrs)  edge [loop above]       node {0} (pqrs)
                edge                    node {1} (pt)
        (pt)    edge [bend left]        node {0} (pq)
                edge                    node {1} (p);
\end{tikzpicture}
    `)
	fmt.Println(svg)
}
