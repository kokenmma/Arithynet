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

TikZの例は[こちら](https://texample.net/tikz/examples/)にあります。

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

- 謎

```
\begin{tikzpicture}
    \draw [white] (0,0) grid (16,20);
	%リボン
	\filldraw [fill = red] (4.5,16) .. controls (4.5,20) and (5,22) .. (8,18) .. controls (11,22) and (11.5,20) .. (11.5,16) -- (4.5,16);
	\draw (8,18) -- (6.5,18.5);
	\draw (8,18) -- (9.5,18.5);

	%顔
	\fill [orange!20!white] (8,12) circle[radius = 6cm];
	\fill [orange!20!white] (2,12) -- (2,0) -- (14,0) -- (14,12) -- cycle;
	
	%髪
    \filldraw [fill = blue!90!red](5.5,13) -- (5.5,16) -- (5,13) --  (2.6,13) -- (2.6,0) -- (1.6,0) -- (1.8,12) arc (180:0:6.2cm)
    -- (14.4,0) -- (13.4,0) -- (13.4,13) -- (11,13) -- (10.5,16) -- (10.5,13) -- (5.5,13);
	
	%左目
	\filldraw [fill = black,thick] (5.5,10.5) circle[radius = 1.5cm] -- (7,12);
	\fill [white] (5.5,10.5) circle[radius = 1.4cm];
	\fill [white] (4,10.5) -- (4,9) -- (7,9) -- (7,10.5) -- (4,10.5) -- cycle;
	\filldraw [fill = black] (5.5,9) circle[radius = 1.5cm];
	\fill [cyan](5.5,8.1) ellipse[x radius = 1cm,y radius = 0.5cm];
	\fill [black] (5.5,9) circle[radius = 0.9cm];
	\fill [white] (5,10.4) ellipse[x radius = 0.5cm,y radius = 1cm];

	%右目
	\filldraw [fill = black,thick] (10.5,10.5) circle[radius = 1.5cm] -- (12,12);
	\fill [white] (10.5,10.5) circle[radius = 1.4cm];
	\fill [white] (9,10.5) -- (9,9.5) -- (12,9) -- (12,10.5) -- (9,10.5) -- cycle;
	\filldraw [fill = black] (10.5,9) circle[radius = 1.5cm];
	\fill [cyan] (10.5,8.1) ellipse[x radius = 1cm,y radius = 0.5cm];
	\fill [black] (10.5,9) circle[radius = 0.9cm];
	\fill [white] (10,10.5) ellipse[x radius = 0.5cm,y radius = 1cm];

	%口
	\draw [thick](8,7) arc (180:360:0.5cm);
	\draw [thick](8,7) arc (0:-180:0.5cm);

	%\draw [help lines] (0,0) grid (16,20); 
	
	%左眉毛
	\draw [thick](4,14) -- (6,14);

	%右眉毛
	\draw [thick](12,14) -- (10,14);
\end{tikzpicture}
```
