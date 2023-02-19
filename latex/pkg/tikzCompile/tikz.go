package tikz

import (
	"log"
	"os"
	"os/exec"
	"strings"
)

func Compile(txt string) {
    cmd := exec.Command("uplatex")
    cmd.Stdin = strings.NewReader(txt)
	stdoutStderr, err := cmd.CombinedOutput()
	if err != nil {
	    log.Printf("%s\n", stdoutStderr)
		log.Fatal(err)
	}
}

func pdf2svg() {
    cmd := exec.Command("pdftocairo", "-svg", "texput.pdf")
	stdoutStderr, err := cmd.CombinedOutput()
	if err != nil {
	    log.Printf("%s\n", stdoutStderr)
		log.Fatal(err)
	}
}

func xdv2svg() {
    cmd := exec.Command("dvisvgm", "texput.dvi")
	stdoutStderr, err := cmd.CombinedOutput()
	if err != nil {
	    log.Printf("%s\n", stdoutStderr)
		log.Fatal(err)
	}
}

func TikzWrapper(txt string) string {
    var tikzPreamble = `
\documentclass[ja=standard,autodetect-engine,dvipdfmx-if-dvi]{bxjsarticle}
%\documentclass[dvipdfmx,uplatex]{jsarticle}
% -------- maths ---------
\usepackage{amsmath, amssymb}
\usepackage{bm}

% -------- images ---------
\usepackage{graphicx}
\usepackage[dvipsnames,table]{xcolor}
\usepackage{pgf}
\usepackage{tikz}
\usetikzlibrary{arrows,automata}

\begin{document}
    `

    var tikzPostamble = `
\end{document}
    `

    Compile(tikzPreamble + txt + tikzPostamble)
    //pdf2svg()
    xdv2svg()

    f,err := os.Open("texput.svg")
    if err != nil {
        log.Println(err)
    }
    defer f.Close()

    buf := make([]byte, 1024*10)
    _, err = f.Read(buf)
    if err != nil {
        log.Println(err)
    }
    return string(buf)
}
