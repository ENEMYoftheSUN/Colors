import { iRGBA, iRGBAarray }             from './iRGBA';
import { iNORMALIZED, iNORMALIZEDarray } from './iNORMALIZED';
import { iHEXA, iHEXAarray }             from './iHEXA';
import { iHSLA, iHSLAarray }             from './iHSLA';


/**
 * v1.2 20112025
 */
export class Colors
{
	private rgba!: iRGBA;
	private normalized!: iNORMALIZED;
	private hexa!: iHEXA;
	private hsla !: iHSLA;


	/**
	 *
	 * @param {number} r int 0-255
	 * @param {number} g int 0-255
	 * @param {number} b int 0-255
	 * @param {number} a int 0-255
	 */
	constructor (r: number = 0, g: number = 0, b: number = 0, a: number = 255)
	{
		this.#setRGBA (r, g, b, a);
		this.#calcFromRGBA ();
	}


	/**
	 *
	 * @param {number} r float 0.0-1.0
	 * @param {number} g float 0.0-1.0
	 * @param {number} b float 0.0-1.0
	 * @param {number} a float 0.0-1.0
	 * @return {Colors}
	 */
	static fromNormalized (r: number = 0, g: number = 0, b: number = 0, a: number = 1.0): Colors
	{
		return (new Colors ()).setNormalized (r, g, b, a);
	}


	/**
	 *
	 * @param {string} r "0"-"F" | "00"-FF"
	 * @param {string} g "0"-"F" | "00"-FF"
	 * @param {string} b "0"-"F" | "00"-FF"
	 * @param {string} a "0"-"F" | "00"-FF"
	 * @return {Colors}
	 */
	static fromHexa (r: string = '00', g: string = '00', b: string = '00', a: string = 'FF'): Colors
	{
		return (new Colors ()).setHexa (r, g, b, a);
	}


	/**
	 *
	 * @param {string} cssColor (avec ou sans le préfixe "#") : "RRGGBB", "RRGGBBAA", "RGB", "RGBA". Valeurs comprises entre "0"-"F" ou "00"-FF"
	 * @return {Colors}
	 */
	static fromString (cssColor: string = '000'): Colors
	{
		cssColor = cssColor.trim ().replace ('#', '');
		const len = cssColor.length;

		// valeurs par défaut
		let values = [ '00', '00', '00', 'FF' ];

		// format "RGB" ou "RGBA"
		if (len === 3 || len === 4)
		{
			values = cssColor.match (/.?/g)!.filter (Boolean);	// on filtre l'element vide revonyé par 'match'
		}
		// format "RRGGBB" ou "RRGGBBAA"
		else if (len === 6 || len === 8)
		{
			values = cssColor.match (/.{2}/g)!.filter (Boolean);
		}

		return (new Colors ()).setHexa (...values);
	}


	/**
	 * Instanciation basée sur le nom CSS de la couleur ('blue', 'AntiqueWhite', ...)
	 * @param {string} name
	 * @return {Colors}
	 */
	static fromColorName (name: string = 'black'): Colors
	{
		const c = document.createElement ('canvas').getContext ('2d')!;
		c.fillStyle = name;
		return Colors.fromString (c.fillStyle);
	}


	/**
	 *
	 * @param {number} h float 0.0-360.0
	 * @param {number} s float 0.0-1.0
	 * @param {number} l float 0.0-1.0
	 * @param {number} a float 0.0-1.0
	 * @return {Colors}
	 */
	static fromHSLA (h: number = 0, s: number = 0, l: number = 0, a: number = 1.0): Colors
	{
		return (new Colors ()).setHSLA (h, s, l, a);
	}


	/**
	 *
	 * @return {number}
	 */
	getInt32ARGB (): number
	{
		const rgba = this.getRGBA ();
		return (rgba.A << 24 >>> 0) + (rgba.R << 16 >>> 0) + (rgba.G << 8 >>> 0) + rgba.B;
	}


	/**
	 *
	 * @return {number}
	 */
	getInt32BGRA (): number
	{
		const rgba = this.getRGBA ();
		return (rgba.B << 24 >>> 0) + (rgba.G << 16 >>> 0) + (rgba.R << 8 >>> 0) + rgba.A;
	}


	/**
	 *
	 * @return {iRGBA}
	 */
	getRGBA (): iRGBA
	{
		return this.rgba;
	}


	/**
	 *
	 * @return {iRGBAarray}
	 */
	getRGBAasArray (): iRGBAarray
	{
		return Object.values (this.getRGBA ()) as iRGBAarray;
	}


	/**
	 *
	 * @return {iNORMALIZED}
	 */
	getNormalized (): iNORMALIZED
	{
		return this.normalized;
	}


	/**
	 *
	 * @return {iNORMALIZEDarray}
	 */
	getNormalizedAsArray (): iNORMALIZEDarray
	{
		return Object.values (this.getNormalized ()) as iNORMALIZEDarray;
	}


	/**
	 *
	 * @return {iHEXA}
	 */
	getHexa (): iHEXA
	{
		return this.hexa;
	}


	/**
	 *
	 * @return {iHEXAarray}
	 */
	getHexaAsArray (): iHEXAarray
	{
		return Object.values (this.getHexa ()) as iHEXAarray;
	}


	/**
	 *
	 * @return {iHSLA}
	 */
	getHSLA (): iHSLA
	{
		return this.hsla;
	}


	/**
	 *
	 * @return {iHSLAarray}
	 */
	getHSLAasArray (): iHSLAarray
	{
		return Object.values (this.getHSLA ()) as iHSLAarray;
	}


	/**
	 *
	 * @param {number} value int 0-255
	 * @return {Colors}
	 */
	setRgbaR (value: number = this.rgba.R): Colors
	{
		return this.setRGBA (value, this.rgba.G, this.rgba.B, this.rgba.A);
	}


	/**
	 *
	 * @param {number} value int 0-255
	 * @return {Colors}
	 */
	setRgbaG (value: number = this.rgba.G): Colors
	{
		return this.setRGBA (this.rgba.R, value, this.rgba.B, this.rgba.A);
	}


	/**
	 *
	 * @param {number} value int 0-255
	 * @return {Colors}
	 */
	setRgbaB (value: number = this.rgba.B): Colors
	{
		return this.setRGBA (this.rgba.R, this.rgba.G, value, this.rgba.A);
	}


	/**
	 *
	 * @param {number} value int 0-255
	 * @return {Colors}
	 */
	setRgbaA (value: number = this.rgba.A): Colors
	{
		return this.setRGBA (this.rgba.R, this.rgba.G, this.rgba.B, value);
	}


	/**
	 *
	 * @param {number} r int 0-255
	 * @param {number} g int 0-255
	 * @param {number} b int 0-255
	 * @param {number} a int 0-255
	 * @return {Colors}
	 */
	setRGBA (r: number = this.rgba.R, g: number = this.rgba.G, b: number = this.rgba.B, a: number = this.rgba.A): Colors
	{
		this.#setRGBA (r, g, b, a);
		this.#calcFromRGBA ();
		return this;
	}


	/**
	 *
	 * @param {number} value float 0.0-1.0
	 * @return {Colors}
	 */
	setNormalizedR (value: number = this.normalized.R): Colors
	{
		return this.setNormalized (value, this.normalized.G, this.normalized.B, this.normalized.A);
	}


	/**
	 *
	 * @param {number} value float 0.0-1.0
	 * @return {Colors}
	 */
	setNormalizedG (value: number = this.normalized.G): Colors
	{
		return this.setNormalized (this.normalized.R, value, this.normalized.B, this.normalized.A);
	}


	/**
	 *
	 * @param {number} value float 0.0-1.0
	 * @return {Colors}
	 */
	setNormalizedB (value: number = this.normalized.B): Colors
	{
		return this.setNormalized (this.normalized.R, this.normalized.G, value, this.normalized.A);
	}


	/**
	 *
	 * @param {number} value float 0.0-1.0
	 * @return {Colors}
	 */
	setNormalizedA (value: number = this.normalized.A): Colors
	{
		return this.setNormalized (this.normalized.R, this.normalized.G, this.normalized.B, value);
	}


	/**
	 *
	 * @param {number} r float 0.0-1.0
	 * @param {number} g float 0.0-1.0
	 * @param {number} b float 0.0-1.0
	 * @param {number} a float 0.0-1.0
	 * @return {Colors}
	 */
	setNormalized (r: number = this.normalized.R, g: number = this.normalized.G, b: number = this.normalized.B, a: number = this.normalized.A): Colors
	{
		this.#setNormalized (r, g, b, a);
		this.#calcFromNormalized ();
		return this;
	}


	/**
	 *
	 * @param {string} value "0"-"F" ou "00"-FF"
	 * @return {Colors}
	 */
	setHexaR (value: string = this.hexa.R): Colors
	{
		return this.setHexa (value, this.hexa.G, this.hexa.B, this.hexa.A);
	}


	/**
	 *
	 * @param {string} value "0"-"F" ou "00"-FF"
	 * @return {Colors}
	 */
	setHexaG (value: string = this.hexa.G): Colors
	{
		return this.setHexa (this.hexa.R, value, this.hexa.B, this.hexa.A);
	}


	/**
	 *
	 * @param {string} value "0"-"F" ou "00"-FF"
	 * @return {Colors}
	 */
	setHexaB (value: string = this.hexa.B): Colors
	{
		return this.setHexa (this.hexa.R, this.hexa.G, value, this.hexa.A);
	}


	/**
	 *
	 * @param {string} value "0"-"F" ou "00"-FF"
	 * @return {Colors}
	 */
	setHexaA (value: string = this.hexa.A): Colors
	{
		return this.setHexa (this.hexa.R, this.hexa.G, this.hexa.B, value);
	}


	/**
	 *
	 * @param {string} r "0"-"F" ou "00"-FF"
	 * @param {string} g "0"-"F" ou "00"-FF"
	 * @param {string} b "0"-"F" ou "00"-FF"
	 * @param {string} a "0"-"F" ou "00"-FF"
	 * @return {Colors}
	 */
	setHexa (r: string = this.hexa.R, g: string = this.hexa.G, b: string = this.hexa.B, a: string = this.hexa.A): Colors
	{
		this.#setHexa (r, g, b, a);
		this.#calcFromHexa ();
		return this;
	}


	/**
	 *
	 * @param {number} value -100 - 100 Pourcentage (entre -100 et 100%) de saturation en plus à appliquer. Retourne une copie.
	 * @return {Colors}
	 */
	saturate (value: number): Colors
	{
		value = this.#clamp (value, -100, 100);
		const hsla = this.getHSLA ();
		const k = hsla.S * value / 100;
		return this.clone ()
			.setHSLA (
				hsla.H,
				hsla.S + k,
				hsla.L,
				hsla.A
			);
	}


	/**
	 *
	 * @param {number} value -100 - 100 Pourcentage (entre -100 et 100%) de luminosité en plus à appliquer. Retourne une copie.
	 * @param {boolean} applyToAlpha Si vrai, l'opération s'applique aussi au canal alpha
	 * @return {Colors}
	 */
	lighten (value: number, applyToAlpha: boolean = false): Colors
	{
		value = this.#clamp (value, -100, 100);
		const hsla = this.getHSLA ();
		const k = hsla.L * value / 100;
		return this.clone ()
			.setHSLA (
				hsla.H,
				hsla.S,
				hsla.L + k,
				hsla.A + (applyToAlpha ? k : 0)
			);
	}


	/**
	 *
	 * @param {number} value -100 - 100 Pourcentage (entre -100 et 100%) de luminosité en moins à appliquer. Retourne une copie.
	 * @param {boolean} applyToAlpha Si vrai, l'opération s'applique aussi au canal alpha
	 * @return {Colors}
	 */
	darken (value: number, applyToAlpha: boolean = false): Colors
	{
		return this.lighten (-value, applyToAlpha);
	}


	/**
	 *
	 * @return {Colors}
	 */
	clone (): Colors
	{
		return new Colors (...this.getRGBAasArray ());
	}


	/**
	 *
	 * @return {Colors}
	 */
	getComplementaryColor (): Colors
	{
		return this.clone ().setHslaH (this.getHSLA ().H + 180);
	}


	/**
	 *
	 * @param {number} value float 0.0-360.0
	 * @return {Colors}
	 */
	setHslaH (value: number = this.hsla.H): Colors
	{
		return this.setHSLA (value, this.hsla.S, this.hsla.L, this.hsla.A);
	}


	/**
	 *
	 * @param {number} value float 0.0-1.0
	 * @return {Colors}
	 */
	setHslaS (value: number = this.hsla.S): Colors
	{
		return this.setHSLA (this.hsla.H, value, this.hsla.L, this.hsla.A);
	}


	/**
	 *
	 * @param {number} value float 0.0-1.0
	 * @return {Colors}
	 */
	setHslaL (value: number = this.hsla.L): Colors
	{
		return this.setHSLA (this.hsla.H, this.hsla.S, value, this.hsla.A);
	}


	/**
	 *
	 * @param {number} value float 0.0-1.0
	 * @return {Colors}
	 */
	setHslaA (value: number = this.hsla.A): Colors
	{
		return this.setHSLA (this.hsla.H, this.hsla.S, this.hsla.L, value);
	}


	/**
	 *
	 * @param {number} h float 0.0-360.0
	 * @param {number} s float 0.0-1.0
	 * @param {number} l float 0.0-1.0
	 * @param {number} a float 0.0-1.0
	 * @return {Colors}
	 */
	setHSLA (h: number = this.hsla.H, s: number = this.hsla.S, l: number = this.hsla.L, a: number = this.hsla.A): Colors
	{
		this.#setHSLA (h, s, l, a);
		this.#calcFromHSLA ();
		return this;
	}


	/**
	 *
	 * @return {string}
	 */
	toCSS_rgb (): string
	{
		return `rgb(${ this.rgba.R }, ${ this.rgba.G }, ${ this.rgba.B })`;
	}


	/**
	 *
	 * @param {number} precision
	 * @return {string}
	 */
	toCSS_rgba (precision: number = 2): string
	{
		return `rgba(${ this.rgba.R }, ${ this.rgba.G }, ${ this.rgba.B }, ${ this.normalized.A.toFixed (precision) })`;
	}


	/**
	 * @param {boolean} noPrefix
	 * @return {string}
	 * @param {boolean} noPrefix
	 */
	toCSS_hex (noPrefix: boolean = false): string
	{
		return `${ noPrefix ? '' : '#' }${ this.hexa.R }${ this.hexa.G }${ this.hexa.B }`;
	}


	/**
	 * @param {boolean} noPrefix
	 * @return {string}
	 */
	toCSS_hexa (noPrefix: boolean = false): string
	{
		return `${ this.toCSS_hex (noPrefix) }${ this.hexa.A }`;
	}


	/**
	 *
	 * @param {number} precision
	 * @return {string}
	 */
	toCSS_hsl (precision: number = 2): string
	{
		return `hsl(${ this.hsla.H.toFixed (precision) }, ${ (this.hsla.S * 100).toFixed (precision) }%, ${ (this.hsla.L * 100).toFixed (precision) }%)`;
	}


	/**
	 *
	 * @param {number} precision
	 * @param {number} precisionAlpha
	 * @return {string}
	 */
	toCSS_hsla (precision: number = 2, precisionAlpha: number = 2): string
	{
		return `hsl(${ this.hsla.H.toFixed (precision) }, ${ (this.hsla.S * 100).toFixed (precision) }%, ${ (this.hsla.L * 100).toFixed (precision) }%, ${ this.hsla.A.toFixed (precisionAlpha) })`;
	}


	/**
	 * @private
	 */
	#calcFromRGBA (): void
	{
		this.#normalizedFromRgba ();
		this.#setHexaFromRGBA (this.getRGBA ());
		this.#HSLAfromNormalized ();
	}


	/**
	 * @private
	 */
	#calcFromNormalized (): void
	{
		this.#RGBAfromNormalized ();
		this.#setHexaFromRGBA (this.getRGBA ());
		this.#HSLAfromNormalized ();
	}


	/**
	 * @private
	 */
	#calcFromHSLA (): void
	{
		this.#setNormalized (...this.#hsla2normalized (this.getHSLA ()));
		this.#RGBAfromNormalized ();
		this.#setHexaFromRGBA (this.getRGBA ());
	}


	/**
	 * @private
	 */
	#calcFromHexa (): void
	{
		this.#setRGBA (
			...this.getHexaAsArray ()
				.map ((v: string) => parseInt (v, 16)) as iRGBAarray
		);
		this.#normalizedFromRgba ();
		this.#HSLAfromNormalized ();
	}


	/**
	 *
	 * @private
	 */
	#normalizedFromRgba (): void
	{
		this.#setNormalized (
			...this.getRGBAasArray ()
				.map ((v: number) => v / 255) as iRGBAarray
		);
	}


	/**
	 *
	 * @private
	 */
	#HSLAfromNormalized (): void
	{
		this.#setHSLA (...this.#normalized2hsla (this.getNormalized ()));
	}


	/**
	 *
	 * @private
	 */
	#RGBAfromNormalized (): void
	{
		this.#setRGBA (
			...this.getNormalizedAsArray ()
				.map ((v: number) => v * 255) as iNORMALIZEDarray
		);
	}


	/**
	 * @param {number} r 0-255
	 * @param {number} g 0-255
	 * @param {number} b 0-255
	 * @param {number} a 0-255
	 * @private
	 */
	#setRGBA (r: number, g: number, b: number, a: number): void
	{
		this.rgba = {
			R: this.#colorClamp (r),
			G: this.#colorClamp (g),
			B: this.#colorClamp (b),
			A: this.#colorClamp (a)
		};
	}


	/**
	 * @param {number} r int 0.0-1.0
	 * @param {number} g int 0.0-1.0
	 * @param {number} b int 0.0-1.0
	 * @param {number} a int 0.0-1.0
	 * @private
	 */
	#setNormalized (r: number, g: number, b: number, a: number): void
	{
		this.normalized = {
			R: this.#clamp (r, 0, 1),
			G: this.#clamp (g, 0, 1),
			B: this.#clamp (b, 0, 1),
			A: this.#clamp (a, 0, 1)
		};
	}


	/**
	 * @param {string} r "0"-"F"|"00"-"FF"
	 * @param {string} g "0"-"F"|"00"-"FF"
	 * @param {string} b "0"-"F"|"00"-"FF"
	 * @param {string} a "0"-"F"|"00"-"FF"
	 * @private
	 */
	#setHexa (r: string, g: string, b: string, a: string): void
	{
		this.hexa = {
			R: this.#cleanHexa (r),
			G: this.#cleanHexa (g),
			B: this.#cleanHexa (b),
			A: this.#cleanHexa (a)
		};
	}


	/**
	 * @param {iRGBA} rgba
	 * @private
	 */
	#setHexaFromRGBA (rgba: iRGBA): void
	{
		this.hexa = {
			R: this.#dec2hex (rgba.R),
			G: this.#dec2hex (rgba.G),
			B: this.#dec2hex (rgba.B),
			A: this.#dec2hex (rgba.A)
		};
	}


	/**
	 * @param {number} h float 0.0-360.0
	 * @param {number} s float 0.0-1.0
	 * @param {number} l float 0.0-1.0
	 * @param {number} a float 0.0-1.0
	 * @private
	 */
	#setHSLA (h: number, s: number, l: number, a: number): void
	{
		this.hsla = {
			H: h % 360,
			S: this.#clamp (s, 0, 1),
			L: this.#clamp (l, 0, 1),
			A: this.#clamp (a, 0, 1)
		};
	}


	/**
	 *
	 * @param {number} num int
	 * @returns {number}
	 * @private
	 */
	#colorClamp (num: number): number
	{
		return this.#clamp (Math.round (num), 0, 255);
	}


	/**
	 *
	 * @param {number} value
	 * @param {number} min
	 * @param {number} max
	 * @return {number}
	 * @private
	 */
	#clamp (value: number, min: number, max: number): number
	{
		return Math.min (Math.max (value, min), max);
	}


	/**
	 *
	 * @param {number} v int
	 * @returns {string} "00"-"FF"
	 * @private
	 */
	#dec2hex (v: number): string
	{
		return this.#colorClamp (v).toString (16).padStart (2, "0").toUpperCase ();
	}


	/**
	 *
	 * @param {string} value
	 * @return {string}	"0F" -> "0F" (15), "F" -> "FF" (255)
	 * @private
	 */
	#cleanHexa (value: string): string
	{
		const cleaned = value.replace (/[^0-9A-F]/ig, '').substring (0, 2).toUpperCase ();
		return cleaned.length === 1 ? cleaned + cleaned : cleaned;
	}


	/**
	 * @param {iNORMALIZED} normalized
	 * @return {iHSLAarray}
	 * @private
	 */
	#normalized2hsla (normalized: iNORMALIZED): iHSLAarray
	{
		const normR = normalized.R;
		const normG = normalized.G;
		const normB = normalized.B;
		const v = Math.max (normR, normG, normB);
		const v2 = v + v;
		const c = v - Math.min (normR, normG, normB);
		const f = 1 - Math.abs (v2 - c - 1);
		const h = c
			&& (
				v === normR
				? (normG - normB) / c
				: v === normG
				  ? 2 + (normB - normR) / c
				  : 4 + (normR - normG) / c
			);

		return [
			60 * (h < 0 ? h + 6 : h),
			f ? c / f : 0,
			(v2 - c) / 2,
			normalized.A
		];
	}


	/**
	 *
	 * @param {iHSLA} hsla
	 * @return {iNORMALIZEDarray}
	 * @private
	 */
	#hsla2normalized (hsla: iHSLA): iNORMALIZEDarray
	{
		const v = hsla.S * Math.min (hsla.L, 1 - hsla.L);
		const f = (n: number, k: number = (n + hsla.H / 30) % 12) => hsla.L - v * Math.max (Math.min (k - 3, 9 - k, 1), -1);
		return [
			f (0),
			f (8),
			f (4),
			hsla.A
		];
	}
}