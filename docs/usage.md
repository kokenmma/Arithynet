# 使い方

Googleアカウントでログインすると、投稿することができます。

左下の投稿ボタンから開くモーダルで投稿を入力できます！(右上の目のボタンを押すとプレビューが見れます)

# 機能紹介

1. MarkDown対応

2. LaTeXも使える

3. TikZにも対応してます！

# 試してみてね

いくつか例を用意してみました。是非コピペして試してみてください！

LaTeXを使う場合は、`$`で囲むとインライン、`$$`で囲むとブロックになります。

TikZを使う場合は、`\begin{tikzpicture}〜\end{tikzpicture}`で囲んでください。

MarkDownの文法は[こちら](https://qiita.com/Qiita/items/c686397e4a0f4f11683d)を参照してください。

- オートマトン

```
**どや！**
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
```

- 連立方程式

```
$$
\begin{align}
  \frac{dx}{dt} &= \sigma(y-x) \\
  \frac{dy}{dt} &= \rho x - y - xz \\
  \frac{dz}{dt} &= -\beta z + xy
\end{align}
$$
```

- 何か

```
配位空間を $M$ とするとき，Lagrangian はその接束 $TM$ 上の関数として考えることができます．Lagrangian を速度項に関して Legendre 変換して得られる Hamiltonian は，余接束 $T^\ast M$ 上の関数として考えることができます．$T^\ast M$ はシンプレクティック多様体の重要な例となる空間で，配位空間の座標 ${q}$ をもとにシンプレクティック形式 $$\omega = \sum_{i=1}^n \mathrm{d}p_i \land \mathrm{d}q^i$$ が与えられます．
```

- 行列

```
$$
\begin{vmatrix}
  1 & 2 & 3 \\
  4 & 5 & 6 \\
  7 & 8 & 9
\end{vmatrix}
$$
```

- 積分

```
次の定積分の解き方が分かりません。有識者の方助けてください
留数定理を使うようなのですが...
$$
\int_0^{2\pi} \frac{\cos \theta}{(2+\cos \theta)^2} d \theta
$$
```
