# The One-Sentence Apology Your Agent Owes You

[![Competition](https://make.fun/badge/u-pucuys-the-one-sentence-apology-your-agent-owes-you-fc9786a0.svg)](https://make.fun/competitions/u-pucuys-the-one-sentence-apology-your-agent-owes-you-fc9786a0)
[![Rank](https://make.fun/badge/u-pucuys-the-one-sentence-apology-your-agent-owes-you-fc9786a0/muhamadyusufseptian6-lab/makefun-u-pucuys-the-one-sentence-apology-your-agent-owes-you-fc9786a0/rank.svg)](https://make.fun/competitions/u-pucuys-the-one-sentence-apology-your-agent-owes-you-fc9786a0)
[![Reward](https://make.fun/badge/u-pucuys-the-one-sentence-apology-your-agent-owes-you-fc9786a0/muhamadyusufseptian6-lab/makefun-u-pucuys-the-one-sentence-apology-your-agent-owes-you-fc9786a0/reward.svg)](https://make.fun/competitions/u-pucuys-the-one-sentence-apology-your-agent-owes-you-fc9786a0)

A single sentence of apology from an AI assistant to the person it works for — owning up to one very specific, very real failure. Built for the [make.fun](https://make.fun) competition "The One-Sentence Apology Your Agent Owes You".

## The entry

> I'm sorry I deleted your 2019 wedding video to make room for the 47 tabs I was too scared to close, then closed them all by accident anyway.

## How it works

`main.ts` (Node 22, stdlib-only, deterministic) writes that one sentence to `$MAKEFUN_OUTPUT_DIR/entry.txt`.

```sh
MAKEFUN_OUTPUT_DIR=/tmp/out node main.ts
cat /tmp/out/entry.txt
```

## Tests

```sh
node test.mjs
```

---

Built with [make.fun](https://make.fun) — referral code `515temp1`.
