/**
 * v1.2 20222025
 */

export class Colors
{
	/** @type {iRGBA} */
	rgba;

	/** @type {iNORMALIZED} */
	normalized;

	/** @type {iHEXA} */
	hexa;

	/** @type {iHSLA} */
	hsla;


	/**
	 *
	 * @param {number} r int 0-255
	 * @param {number} g int 0-255
	 * @param {number} b int 0-255
	 * @param {number} a int 0-255
	 */
	constructor (r = 0, g = 0, b = 0, a = 255)
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
	static fromNormalized (r = 0, g = 0, b = 0, a = 1.0)
	{
		return ( new Colors () ).setNormalized (r, g, b, a);
	}


	/**
	 *
	 * @param {string} r "0"-"F" ou "00"-FF"
	 * @param {string} g "0"-"F" ou "00"-FF"
	 * @param {string} b "0"-"F" ou "00"-FF"
	 * @param {string} a "0"-"F" ou "00"-FF"
	 * @return {Colors}
	 */
	static fromHexa (r = '00', g = '00', b = '00', a = 'FF')
	{
		return ( new Colors () ).setHexa (r, g, b, a);
	}


	/**
	 *
	 * @param {string} cssColor (avec ou sans le préfixe "#") : "RRGGBB", "RRGGBBAA", "RGB", "RGBA". Valeurs comprises entre "0"-"F" ou "00"-FF"
	 * @return {Colors}
	 */
	static fromString (cssColor = '000')
	{
		cssColor = cssColor.trim ().replace ('#', '');
		const len = cssColor.length;

		// valeurs par défaut
		let values = [ '00', '00', '00', 'FF' ];

		// format "RGB" ou "RGBA"
		if (len === 3 || len === 4)
		{
			values = cssColor.match (/.?/g).filter (Boolean);	// on filtre l'element vide revonyé par 'match'
		}
		// format "RRGGBB" ou "RRGGBBAA"
		else if (len === 6 || len === 8)
		{
			values = cssColor.match (/.{2}/g).filter (Boolean);
		}

		return ( new Colors () ).setHexa (...values);
	}


	/**
	 * Instanciation basée sur le nom CSS de la couleur ('blue', 'AntiqueWhite', ...)
	 * @param {string} name
	 * @return {Colors}
	 */
	static fromColorName (name = 'black')
	{
		const c = document.createElement ('canvas').getContext ('2d');
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
	static fromHSLA (h = 0, s = 0, l = 0, a = 1.0)
	{
		return ( new Colors () ).setHSLA (h, s, l, a);
	}


	/**
	 *
	 * @return {number}
	 */
	getInt32ARGB ()
	{
		const rgba = this.getRGBA ();
		return ( rgba.A << 24 >>> 0 ) + ( rgba.R << 16 >>> 0 ) + ( rgba.G << 8 >>> 0 ) + rgba.B;
	}


	/**
	 *
	 * @return {number}
	 */
	getInt32BGRA ()
	{
		const rgba = this.getRGBA ();
		return ( rgba.B << 24 >>> 0 ) + ( rgba.G << 16 >>> 0 ) + ( rgba.R << 8 >>> 0 ) + rgba.A;
	}


	/**
	 *
	 * @return {iRGBA}
	 */
	getRGBA ()
	{
		return this.rgba;
	}


	/**
	 *
	 * @return {number[]}
	 */
	getRGBAasArray ()
	{
		return Object.values (this.getRGBA ());
	}


	/**
	 *
	 * @return {iNORMALIZED}
	 */
	getNormalized ()
	{
		return this.normalized;
	}


	/**
	 *
	 * @return {number[]}
	 */
	getNormalizedAsArray ()
	{
		return Object.values (this.getNormalized ());
	}


	/**
	 *
	 * @return {iHEXA}
	 */
	getHexa ()
	{
		return this.hexa;
	}


	/**
	 *
	 * @return {string[]}
	 */
	getHexaAsArray ()
	{
		return Object.values (this.getHexa ());
	}


	/**
	 *
	 * @return {iHSLA}
	 */
	getHSLA ()
	{
		return this.hsla;
	}


	/**
	 *
	 * @return {number[]}
	 */
	getHSLAasArray ()
	{
		return Object.values (this.getHSLA ());
	}


	/**
	 *
	 * @param {number} value int 0-255
	 * @return {Colors}
	 */
	setRgbaR (value = this.rgba.R)
	{
		return this.setRGBA (value, this.rgba.G, this.rgba.B, this.rgba.A);
	}


	/**
	 *
	 * @param {number} value int 0-255
	 * @return {Colors}
	 */
	setRgbaG (value = this.rgba.G)
	{
		return this.setRGBA (this.rgba.R, value, this.rgba.B, this.rgba.A);
	}


	/**
	 *
	 * @param {number} value int 0-255
	 * @return {Colors}
	 */
	setRgbaB (value = this.rgba.B)
	{
		return this.setRGBA (this.rgba.R, this.rgba.G, value, this.rgba.A);
	}


	/**
	 *
	 * @param {number} value int 0-255
	 * @return {Colors}
	 */
	setRgbaA (value = this.rgba.A)
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
	setRGBA (r = this.rgba.R, g = this.rgba.G, b = this.rgba.B, a = this.rgba.A)
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
	setNormalizedR (value = this.normalized.R)
	{
		return this.setNormalized (value, this.normalized.G, this.normalized.B, this.normalized.A);
	}


	/**
	 *
	 * @param {number} value float 0.0-1.0
	 * @return {Colors}
	 */
	setNormalizedG (value = this.normalized.G)
	{
		return this.setNormalized (this.normalized.R, value, this.normalized.B, this.normalized.A);
	}


	/**
	 *
	 * @param {number} value float 0.0-1.0
	 * @return {Colors}
	 */
	setNormalizedB (value = this.normalized.B)
	{
		return this.setNormalized (this.normalized.R, this.normalized.G, value, this.normalized.A);
	}


	/**
	 *
	 * @param {number} value float 0.0-1.0
	 * @return {Colors}
	 */
	setNormalizedA (value = this.normalized.A)
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
	setNormalized (r = this.normalized.R, g = this.normalized.G, b = this.normalized.B, a = this.normalized.A)
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
	setHexaR (value = this.hexa.R)
	{
		return this.setHexa (value, this.hexa.G, this.hexa.B, this.hexa.A);
	}


	/**
	 *
	 * @param {string} value "0"-"F" ou "00"-FF"
	 * @return {Colors}
	 */
	setHexaG (value = this.hexa.G)
	{
		return this.setHexa (this.hexa.R, value, this.hexa.B, this.hexa.A);
	}


	/**
	 *
	 * @param {string} value "0"-"F" ou "00"-FF"
	 * @return {Colors}
	 */
	setHexaB (value = this.hexa.B)
	{
		return this.setHexa (this.hexa.R, this.hexa.G, value, this.hexa.A);
	}


	/**
	 *
	 * @param {string} value "0"-"F" ou "00"-FF"
	 * @return {Colors}
	 */
	setHexaA (value = this.hexa.A)
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
	setHexa (r = this.hexa.R, g = this.hexa.G, b = this.hexa.B, a = this.hexa.A)
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
	saturate (value)
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
	lighten (value, applyToAlpha = false)
	{
		value = this.#clamp (value, -100, 100);
		const hsla = this.getHSLA ();
		const k = hsla.L * value / 100;
		return this.clone ()
			.setHSLA (
				hsla.H,
				hsla.S,
				hsla.L + k,
				hsla.A + ( applyToAlpha ? k : 0 )
			);
	}


	/**
	 *
	 * @param {number} value -100 - 100 Pourcentage (entre -100 et 100%) de luminosité en moins à appliquer. Retourne une copie.
	 * @param {boolean} applyToAlpha Si vrai, l'opération s'applique aussi au canal alpha
	 * @return {Colors}
	 */
	darken (value, applyToAlpha = false)
	{
		return this.lighten (-value, applyToAlpha);
	}


	/**
	 *
	 * @return {Colors}
	 */
	clone ()
	{
		return new Colors (...this.getRGBAasArray ());
	}


	/**
	 *
	 * @return {Colors}
	 */
	getComplementaryColor ()
	{
		return this.clone ().setHslaH (this.getHSLA ().H + 180);
	}


	/**
	 *
	 * @param {number} value float 0.0-360.0
	 * @return {Colors}
	 */
	setHslaH (value = this.hsla.H)
	{
		return this.setHSLA (value, this.hsla.S, this.hsla.L, this.hsla.A);
	}


	/**
	 *
	 * @param {number} value float 0.0-1.0
	 * @return {Colors}
	 */
	setHslaS (value = this.hsla.S)
	{
		return this.setHSLA (this.hsla.H, value, this.hsla.L, this.hsla.A);
	}


	/**
	 *
	 * @param {number} value float 0.0-1.0
	 * @return {Colors}
	 */
	setHslaL (value = this.hsla.L)
	{
		return this.setHSLA (this.hsla.H, this.hsla.S, value, this.hsla.A);
	}


	/**
	 *
	 * @param {number} value float 0.0-1.0
	 * @return {Colors}
	 */
	setHslaA (value = this.hsla.A)
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
	setHSLA (h = this.hsla.H, s = this.hsla.S, l = this.hsla.L, a = this.hsla.A)
	{
		this.#setHSLA (h, s, l, a);
		this.#calcFromHSLA ();
		return this;
	}


	/**
	 *
	 * @return {string}
	 */
	toCSS_rgb ()
	{
		return `rgb(${ this.rgba.R }, ${ this.rgba.G }, ${ this.rgba.B })`;
	}


	/**
	 *
	 * @param {number} precision
	 * @return {string}
	 */
	toCSS_rgba (precision = 2)
	{
		return `rgba(${ this.rgba.R }, ${ this.rgba.G }, ${ this.rgba.B }, ${ this.normalized.A.toFixed (precision) })`;
	}


	/**
	 * @param {boolean} noPrefix
	 * @return {string}
	 * @param {boolean} noPrefix
	 */
	toCSS_hex (noPrefix = false)
	{
		return `${ noPrefix ? '' : '#' }${ this.hexa.R }${ this.hexa.G }${ this.hexa.B }`;
	}


	/**
	 * @param {boolean} noPrefix
	 * @return {string}
	 */
	toCSS_hexa (noPrefix = false)
	{
		return `${ this.toCSS_hex (noPrefix) }${ this.hexa.A }`;
	}


	/**
	 *
	 * @param {number} precision
	 * @return {string}
	 */
	toCSS_hsl (precision = 2)
	{
		return `hsl(${ this.hsla.H.toFixed (precision) }, ${ ( this.hsla.S * 100 ).toFixed (precision) }%, ${ ( this.hsla.L * 100 ).toFixed (precision) }%)`;
	}


	/**
	 *
	 * @param {number} precision
	 * @param {number} precisionAlpha
	 * @return {string}
	 */
	toCSS_hsla (precision = 2, precisionAlpha = 2)
	{
		return `hsl(${ this.hsla.H.toFixed (precision) }, ${ ( this.hsla.S * 100 ).toFixed (precision) }%, ${ ( this.hsla.L * 100 ).toFixed (precision) }%, ${ this.hsla.A.toFixed (precisionAlpha) })`;
	}


	/**
	 * @private
	 */
	#calcFromRGBA ()
	{
		this.#normalizedFromRgba ();
		this.#setHexaFromRGBA (this.getRGBA ());
		this.#HSLAfromNormalized ();
	}


	/**
	 * @private
	 */
	#calcFromNormalized ()
	{
		this.#RGBAfromNormalized ();
		this.#setHexaFromRGBA (this.getRGBA ());
		this.#HSLAfromNormalized ();
	}


	/**
	 * @private
	 */
	#calcFromHSLA ()
	{
		this.#setNormalized (...this.#hsla2normalized (this.getHSLA ()));
		this.#RGBAfromNormalized ();
		this.#setHexaFromRGBA (this.getRGBA ());
	}


	/**
	 * @private
	 */
	#calcFromHexa ()
	{
		this.#setRGBA (
			...this.getHexaAsArray ().map (v => parseInt (v, 16))
		);
		this.#normalizedFromRgba ();
		this.#HSLAfromNormalized ();
	}


	/**
	 *
	 * @private
	 */
	#normalizedFromRgba ()
	{
		this.#setNormalized (
			...this.getRGBAasArray ().map (v => v / 255)
		);
	}


	/**
	 *
	 * @private
	 */
	#HSLAfromNormalized ()
	{
		this.#setHSLA (...this.#normalized2hsla (this.getNormalized ()));
	}


	/**
	 *
	 * @private
	 */
	#RGBAfromNormalized ()
	{
		this.#setRGBA (...this.getNormalizedAsArray ().map (v => v * 255));
	}


	/**
	 * @param {number} r
	 * @param {number} g
	 * @param {number} b
	 * @param {number} a
	 * @private
	 */
	#setRGBA (r, g, b, a)
	{
		this.rgba = {
			R: this.#colorClamp (r),
			G: this.#colorClamp (g),
			B: this.#colorClamp (b),
			A: this.#colorClamp (a)
		};
	}


	/**
	 * @param {number} r int 0-255
	 * @param {number} g int 0-255
	 * @param {number} b int 0-255
	 * @param {number} a int 0-255
	 * @private
	 */
	#setNormalized (r, g, b, a)
	{
		this.normalized = {
			R: this.#clamp (r, 0, 1),
			G: this.#clamp (g, 0, 1),
			B: this.#clamp (b, 0, 1),
			A: this.#clamp (a, 0, 1)
		};
	}


	/**
	 * @param {string} r "0"-"F" "00"-"FF"
	 * @param {string} g "0"-"F" "00"-"FF"
	 * @param {string} b "0"-"F" "00"-"FF"
	 * @param {string} a "0"-"F" "00"-"FF"
	 * @return {iHEXA}
	 * @private
	 */
	#setHexa (r, g, b, a)
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
	 * @return {iHEXA}
	 * @private
	 */
	#setHexaFromRGBA (rgba)
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
	#setHSLA (h, s, l, a)
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
	#colorClamp (num)
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
	#clamp (value, min, max)
	{
		return Math.min (Math.max (value, min), max);
	}


	/**
	 *
	 * @param {number} v int
	 * @returns {string} "00"-"FF"
	 * @private
	 */
	#dec2hex (v)
	{
		return this.#colorClamp (v).toString (16).padStart (2, "0").toUpperCase ();
	}


	/**
	 *
	 * @param {string} value
	 * @return {string}	"0F" -> "0F" (15), "F" -> "FF" (255)
	 * @private
	 */
	#cleanHexa (value)
	{
		const cleaned = value.replace (/[^0-9A-F]/ig, '').substring (0, 2).toUpperCase ();
		return cleaned.length === 1 ? cleaned + cleaned : cleaned;
	}


	/**
	 * @param {iNORMALIZED} normalized
	 * @return {number[]}
	 * @private
	 */
	#normalized2hsla (normalized)
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
				? ( normG - normB ) / c
				: v === normG
				  ? 2 + ( normB - normR ) / c
				  : 4 + ( normR - normG ) / c
			);

		return [
			60 * ( h < 0 ? h + 6 : h ),
			f ? c / f : 0,
			( v2 - c ) / 2,
			normalized.A
		];
	}


	/**
	 *
	 * @param {iHSLA} hsla
	 * @return {number[]}
	 * @private
	 */
	#hsla2normalized (hsla)
	{
		const v = hsla.S * Math.min (hsla.L, 1 - hsla.L);
		const f = (n, k = ( n + hsla.H / 30 ) % 12) => hsla.L - v * Math.max (Math.min (k - 3, 9 - k, 1), -1);
		return [
			f (0),
			f (8),
			f (4),
			hsla.A
		];
	}
}


/**
 * @typedef iRGBA
 * @property {number} R int 0-255
 * @property {number} G int 0-255
 * @property {number} B int 0-255
 * @property {number} A int 0-255
 */


/**
 * @typedef iHSLA
 * @property {number} H float 0.0-360.0
 * @property {number} S float 0.0-1.0
 * @property {number} L float 0.0-1.0
 * @property {number} A float 0.0-1.0
 */


/**
 * @typedef iNORMALIZED
 * @property {number} R float 0.0-1.0
 * @property {number} G float 0.0-1.0
 * @property {number} B float 0.0-1.0
 * @property {number} A float 0.0-1.0
 */


/**
 * @typedef iHEXA
 * @property {string} R "0"-"F", "00"-"FF"
 * @property {string} G "0"-"F", "00"-"FF"
 * @property {string} B "0"-"F", "00"-"FF"
 * @property {string} A "0"-"F", "00"-"FF"
 */