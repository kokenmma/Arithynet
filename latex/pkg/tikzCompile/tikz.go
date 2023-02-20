package tikz

import (
	"errors"
	"io/ioutil"
	"log"
	"os"
	"os/exec"
	"strings"
)

type Tikz struct {
	preamble     string
	index        string
	postamble    string
	dirname      string
	svg          string
	stdoutStderr string
}

func NewTikz(index string) *Tikz {
	return &Tikz{
		preamble: `\documentclass[xelatex,ja=standard]{bxjsarticle}
% -------- maths ---------
\usepackage{amsmath, amssymb}
\usepackage{bm}
\usepackage{bbm}
\usepackage{mathtools}
\usepackage{physics}

% -------- images ---------
\usepackage{graphicx}
\usepackage[dvipsnames,table]{xcolor}
\usepackage{float}
\usepackage{pgf}
\usepackage{tikz}
\usetikzlibrary{arrows,automata}

\begin{document}
`,
		index: index,
		postamble: `
\end{document}`,
	}
}

func (t *Tikz) MakeDir() *Tikz {
	dir, err := os.MkdirTemp("", "tikz")
	if err != nil {
		log.Println("MakeDir err")
		log.Println(err)
		return t
	}
	t.dirname = dir
	return t
}

func (t *Tikz) Compile() *Tikz {
	cmd := exec.Command("tectonic", "-X", "compile", "-o", t.dirname, "-")
	cmd.Stdin = strings.NewReader(t.preamble + t.index + t.postamble)
	stdoutStderr, err := cmd.CombinedOutput()
	if err != nil {
		log.Printf("%s\n", stdoutStderr)
		log.Println(err)
		t.stdoutStderr += string(stdoutStderr)
		return t
	}
	return t
}

func (t *Tikz) Pdf2svg() *Tikz {
	cmd := exec.Command("pdftocairo", "-svg", t.dirname+"/texput.pdf", t.dirname+"/texput.svg")
	stdoutStderr, err := cmd.CombinedOutput()
	if err != nil {
		log.Printf("%s\n", stdoutStderr)
		log.Println(err)
		t.stdoutStderr += string(stdoutStderr)
		return t
	}
	return t
}

func (t *Tikz) SvgString() (string, error) {
	f, err := ioutil.ReadFile(t.dirname + "/texput.svg")
	if err != nil {
		log.Println(err)
		var stdOE = errors.New(t.stdoutStderr)
		return "", stdOE
	}
	return string(f), nil
}

func (t *Tikz) RmoveDir() *Tikz {
	err := os.RemoveAll(t.dirname)
	if err != nil {
		log.Println("RmoveDir err")
		log.Println(err)
	}
	return t
}

func TikzWrapper(index string) string {
	res := NewTikz(index)
	svg, _ := res.MakeDir().Compile().Pdf2svg().SvgString()
	res.RmoveDir()
	return svg
}
