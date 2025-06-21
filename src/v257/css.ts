export const css: string = `
div.__wbh__ {
    transition: opacity 1s;
    opacity: 1;
	display: flex;
	flex-direction: column;
	height: 100dvh;
	justify-content: safe center;
	text-align: center;
	width: 66%;
	margin: 0 auto;
	font-family: 'Fira Sans', sans-serif;
}
div.__wbh__ p {
	line-height: 1.5;
    text-wrap: balance;
}
div.__wbh__ a {
	transition: color .5s;
	color: blue;
	text-decoration: dotted underline blue 1px;
}
div.__wbh__ a.CHROME {
    font-weight: 700;
	text-decoration: dotted underline #48f8 1px;
    color: #48f;
}
div.__wbh__ a.FIREFOX {
    font-weight: 700;
	text-decoration: dotted underline #e808 1px;
    color: #e80;
}

details {
    /* l: https://nerdy.dev/open-and-close-transitions-for-the-details-element */
    /* l: https://developer.mozilla.org/en-US/docs/Web/CSS/::details-content */
    /* H: No support on Firefox v138 */
    @media (prefers-reduced-motion: no-preference) {
        interpolate-size: allow-keywords;
    }
    &::details-content {
        opacity: 0;
        block-size: 0;
        overflow-y: clip;
        transition: content-visibility .5s allow-discrete, opacity .5s, block-size .5s;
    }
    &[open]::details-content {
        opacity: 1;
        block-size: auto;
    }
}

summary {
    font-weight: 700;
	font-size: 90%;
	color: #8888;
	background-color: none;
	transition: background-color 0.25s;
	&:hover {
		background-color: #8882;
	}
	border-radius: 9999px;
	padding: 0.25rem;
	user-select: none;
	cursor: pointer;
	margin: 0 auto;
	width: min(240px, 100%);
}
div.BROWSER {
	margin: 0;
	font-weight: 700;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	aspect-ratio: 2 / 3;
	& > svg {
		width: 18px;
		height: 18px;
        &.mobile {
            position: absolute;
            transform: translate(8px, -4px);
            color: hsl(from var(--color) h calc(s - 20) calc(l - 5));
            width: 9px;
            height: 9px;
        }
		& > use {
			width: 100%;
			height: 100%;
			display: block;
		}
	}
	& > h5 {
		margin: 0;
		margin-top: 0.25rem;
	}
    opacity: 0.75;

    &.CHROME {
        --color: #4285f4;
    }
    &.FIREFOX {
        --color: #ee8800;
    }
    transition: color 0.5s;
    color: var(--color);
    @media (prefers-color-scheme: dark) {
        color: hsl(from var(--color) h calc(s + 20) calc(l + 10));
    }
}

div.ROOT {
	margin: 0 auto;
	display: flex;
	gap: 0.5rem;
	width: min(100%, 800px);
	flex-wrap: wrap;
	align-items: stretch;
	justify-content: center;
	padding-top: 0.5rem;
}

div.LOGO {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
    max-height: 48px;
}

div.FEATURE {
	flex: 0 0 100%;
    max-width: min(320px, 100%);
	display: grid;
    place-items: stretch stretch;
    grid-template-areas: "a";
    & > * {
        grid-area: "a";
    }
	color: #445;
	transition: background-color 0.25s;
	background-color: rgba(from var(--color) r g b / 0.5);
	border-radius: 9999px;
	padding-left: .5rem;
	padding-right: 1rem;
    & > a {
        display: block;
        position: absolute;
        height: 100%;
        width: 100%;
        text-decoration: none;
    }
	&[data-level="0"] {
		--color: #c88;
	}
	&[data-level="1"] {
		--color: #8cc;
	}
	&[data-level="2"] {
		--color: #8a8;
	}
	&[data-level="3"] {
		--color: #999;
	}
	&:hover {
		background-color: hsl(from var(--color) h s calc(l - 10) / 0.5);
	}

    @media (prefers-color-scheme: dark) {
        color: #eee;
    }

    position: relative;
    &::after {
        position: absolute;
        content: '';
        top: 0;
        left: 0;
        border-radius: 9999px;
        width: 100%;
        height: 100%;
        z-index: -1;
        transition: opacity 0.25s;
        opacity: 0.2;
        box-shadow: 0 0.2rem 0.2rem #888;
        @media (prefers-color-scheme: dark) {
            opacity:0.4;
        }
    }
}

div.FLEX3 {
    display: flex;
    flex-direction: row;
    justify-content: center;
    flex: 0 0 48px;
    gap: 0.5rem;
}


div.FLEX {
    z-index: 1;
    width: 0;
    min-width: 100%;
    user-select: none;
    pointer-events: none;
	height: 3rem;
	display: flex;
	align-items: center;
	gap: .5rem;
	& > h4 {
		flex: 1 1 24px;
        min-width: 0;
		margin: 0;
		text-align: left;
		text-wrap: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
        transition: color .5s;
        color: hsl(from var(--color) h calc(s - 10) calc(l - 30));
        @media (prefers-color-scheme: dark) {
            color: #eee;
        }

        & > h6 {
            margin: 0;
            opacity: 0.5;
            font-size: 50%;
            transition: color .5s;
		    color: hsl(from var(--color) h s calc(l - 30));
            @media (prefers-color-scheme: dark) {
                color: #eee;
            }
        }
	}
    & > div.FLEX2 {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        flex: 0 0 48px;
        gap: 0.5rem;
    }
    & > button {
        user-select: auto;
        pointer-events: auto;
        border-radius: 9999px;
        cursor: pointer;
        border: none;
        width: 1.5rem;
        height: 1.5rem;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 1.5rem;
        font-weight: 700;
        background-color: #fff4;
        font-family: 'Fira Sans', sans-serif;
        color: hsl(from var(--color) h calc(s - 10) calc(l - 30) / 0.5);
        transition: color .5s, background-color .25s, opacity .25s;
        opacity: 0.5;
        &:hover {
            background-color: #fff6;
            opacity: 1;
        }
        @media (prefers-color-scheme: dark) {
            color: #eee8;
        }
        position: relative;
        &::after {
            content: '';
            position: absolute;
            /* i: Technique to increase clickable area */
            /* l: https://css-tricks.com/enhancing-the-clickable-area-size/ */
            /* l: https://ishadeed.com/article/clickable-area/ */
            inset: -1rem;
        }
    }
}

h6.FOOTER > a {
    color: hsl(from var(--color) h s calc(l - 30));
    text-decoration: none;
}

p.DISCLAIMER {
    font-style: italic;
    opacity: 0.5;
    font-size: 75%;
}

dialog {
    user-select: auto;
    pointer-events: auto;
    /* H: Firefox v138 does not support transitioning display (fade out) */
    /* H: There is a little flickering of overlay on Chrome */
    transition: opacity .5s, overlay .5s allow-discrete, display .5s allow-discrete, color .5s, background-color .5s;
    box-shadow: 0 .2rem .2rem .2rem #4444;
    max-width: min(320px, 100%);
    border: none;
    border-radius: 1rem;
    opacity: 0;
    padding: 0;
    &[open] {
        opacity: 1;

        @starting-style {
            opacity: 0;
        }
    }
    & > div {
        width: 100%;
        height: 100%;
        padding: 1rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        & h2 {
            color: hsl(from var(--color) h calc(s - 10) calc(l - 30));
            margin: .5rem 0;
        }
        & h5 {
            color: hsl(from var(--color) h calc(s - 10) calc(l - 30));
            background-color: hsl(from var(--color) h calc(s - 10) calc(l - 30) / 0.25);
            border-radius: 9999px;
            width: fit-content;
            padding: 0 1rem;
            opacity: .75;
            margin: 0 0 .5rem;
        }
        & p {
            margin: .5rem 0;
        }
    }
    color: #333;
    background-color: #fff;
}
`
