/**
 *
 */
class Colors
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
		this._setRGBA (r, g, b, a);
		this._calcFromRGBA ();
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
	static fromHexa (r = '', g = '', b = '', a = 'FF')
	{
		return ( new Colors () ).setHexa (r, g, b, a);
	}


	/**
	 *
	 * @param {string} cssColor (avec ou sans le préfixe "#") : "RRGGBB", "RRGGBBAA", "RGB", "RGBA". Valeurs comprises entre "0"-"F" ou "00"-FF"
	 * @return {Colors}
	 */
	static fromString (cssColor)
	{
		cssColor = cssColor.trim ().replace ('#', '');
		const values = cssColor.length === 3 || cssColor.length === 4	// format "RGB" ou "RGBA"
					   ? cssColor.match (/.?/g).filter (Boolean)
					   : cssColor.length === 6 || cssColor.length === 8			// format "RRGGBB" ou "RRGGBBAA"
						 ? cssColor.match (/.{0,2}/g).filter (Boolean)
						 : [ '00', '00', '00', 'FF' ];
		return ( new Colors () ).setHexa (...values);
	}


	/**
	 *
	 * @param {number} h float 0.0-360.0
	 * @param {number} s float 0.0-1.0
	 * @param {number} l float 0.0-1.0
	 * @param {number} a float 0.0-1.0
	 * @return {Colors}
	 */
	static fromHSLA (h, s, l, a = 1.0)
	{
		return ( new Colors () ).setHSLA (h, s, l, a);
	}


	/**
	 *
	 * @return {number}
	 */
	getInt32ARGB ()
	{
		return ( this.rgba.A << 24 >>> 0 ) + ( this.rgba.R << 16 >>> 0 ) + ( this.rgba.G << 8 >>> 0 ) + this.rgba.B;
	}


	/**
	 *
	 * @return {number}
	 */
	getInt32BGRA ()
	{
		return ( this.rgba.B << 24 >>> 0 ) + ( this.rgba.G << 16 >>> 0 ) + ( this.rgba.R << 8 >>> 0 ) + this.rgba.A;
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
	 * @return {iNORMALIZED}
	 */
	getNormalized ()
	{
		return this.normalized;
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
	 * @return {iHSLA}
	 */
	getHSLA ()
	{
		return this.hsla;
	}


	/**
	 *
	 * @param {number} value int 0-255
	 * @return {Colors}
	 */
	setRgbaR (value)
	{
		this._setRGBA (value, this.rgba.G, this.rgba.B, this.rgba.A);
		this._calcFromRGBA ();
		return this;
	}


	/**
	 *
	 * @param {number} value int 0-255
	 * @return {Colors}
	 */
	setRgbaG (value)
	{
		this._setRGBA (this.rgba.R, value, this.rgba.B, this.rgba.A);
		this._calcFromRGBA ();
		return this;
	}


	/**
	 *
	 * @param {number} value int 0-255
	 * @return {Colors}
	 */
	setRgbaB (value)
	{
		this._setRGBA (this.rgba.R, this.rgba.G, value, this.rgba.A);
		this._calcFromRGBA ();
		return this;
	}


	/**
	 *
	 * @param {number} value int 0-255
	 * @return {Colors}
	 */
	setRgbaA (value)
	{
		this._setRGBA (this.rgba.R, this.rgba.G, this.rgba.B, value);
		this._calcFromRGBA ();
		return this;
	}


	/**
	 *
	 * @param {number} r int 0-255
	 * @param {number} g int 0-255
	 * @param {number} b int 0-255
	 * @param {number} a int 0-255
	 * @return {Colors}
	 */
	setRGBA (r, g, b, a = this.rgba.A)
	{
		this._setRGBA (r, g, b, a);
		this._calcFromRGBA ();
		return this;
	}


	/**
	 *
	 * @param {number} value float 0.0-1.0
	 * @return {Colors}
	 */
	setNormalizedR (value)
	{
		this._setNormalized (value, this.normalized.G, this.normalized.B, this.normalized.A);
		this._calcFromNormalized ();
		return this;
	}


	/**
	 *
	 * @param {number} value float 0.0-1.0
	 * @return {Colors}
	 */
	setNormalizedG (value)
	{
		this._setNormalized (this.normalized.R, value, this.normalized.B, this.normalized.A);
		this._calcFromNormalized ();
		return this;
	}


	/**
	 *
	 * @param {number} value float 0.0-1.0
	 * @return {Colors}
	 */
	setNormalizedB (value)
	{
		this._setNormalized (this.normalized.R, this.normalized.G, value, this.normalized.A);
		this._calcFromNormalized ();
		return this;
	}


	/**
	 *
	 * @param {number} value float 0.0-1.0
	 * @return {Colors}
	 */
	setNormalizedA (value)
	{
		this._setNormalized (this.normalized.R, this.normalized.G, this.normalized.B, value);
		this._calcFromNormalized ();
		return this;
	}


	/**
	 *
	 * @param {number} r float 0.0-1.0
	 * @param {number} g float 0.0-1.0
	 * @param {number} b float 0.0-1.0
	 * @param {number} a float 0.0-1.0
	 * @return {Colors}
	 */
	setNormalized (r, g, b, a = this.normalized.A)
	{
		this._setNormalized (r, g, b, a);
		this._calcFromNormalized ();
		return this;
	}


	/**
	 *
	 * @param {string} value "0"-"F" ou "00"-FF"
	 * @return {Colors}
	 */
	setHexaR (value)
	{
		this._setHexa (value, this.hexa.G, this.hexa.B, this.hexa.A);
		this._calcFromHexa ();
		return this;
	}


	/**
	 *
	 * @param {string} value "0"-"F" ou "00"-FF"
	 * @return {Colors}
	 */
	setHexaG (value)
	{
		this._setHexa (this.hexa.R, value, this.hexa.B, this.hexa.A);
		this._calcFromHexa ();
		return this;
	}


	/**
	 *
	 * @param {string} value "0"-"F" ou "00"-FF"
	 * @return {Colors}
	 */
	setHexaB (value)
	{
		this._setHexa (this.hexa.R, this.hexa.G, value, this.hexa.A);
		this._calcFromHexa ();
		return this;
	}


	/**
	 *
	 * @param {string} value "0"-"F" ou "00"-FF"
	 * @return {Colors}
	 */
	setHexaA (value)
	{
		this._setHexa (this.hexa.R, this.hexa.G, this.hexa.B, value);
		this._calcFromHexa ();
		return this;
	}


	/**
	 *
	 * @param {string} r "0"-"F" ou "00"-FF"
	 * @param {string} g "0"-"F" ou "00"-FF"
	 * @param {string} b "0"-"F" ou "00"-FF"
	 * @param {string} a "0"-"F" ou "00"-FF"
	 * @return {Colors}
	 */
	setHexa (r, g, b, a = this.hexa.A)
	{
		this._setHexa (r, g, b, a);
		this._calcFromHexa ();
		return this;
	}


	/**
	 *
	 * @param {number} value float 0.0-360.0
	 * @return {Colors}
	 */
	setHslaH (value)
	{
		this._setHSLA (value, this.hsla.S, this.hsla.L, this.hsla.A);
		this._calcFromHSLA ();
		return this;
	}


	/**
	 *
	 * @param {number} value float 0.0-1.0
	 * @return {Colors}
	 */
	setHslaS (value)
	{
		this._setHSLA (this.hsla.H, value, this.hsla.L, this.hsla.A);
		this._calcFromHSLA ();
		return this;
	}


	/**
	 *
	 * @param {number} value float 0.0-1.0
	 * @return {Colors}
	 */
	setHslaL (value)
	{
		this._setHSLA (this.hsla.H, this.hsla.S, value, this.hsla.A);
		this._calcFromHSLA ();
		return this;
	}


	/**
	 *
	 * @param {number} value float 0.0-1.0
	 * @return {Colors}
	 */
	setHslaA (value)
	{
		this._setHSLA (this.hsla.H, this.hsla.S, this.hsla.L, value);
		this._calcFromHSLA ();
		return this;
	}


	/**
	 *
	 * @param {number} h float 0.0-360.0
	 * @param {number} s float 0.0-1.0
	 * @param {number} l float 0.0-1.0
	 * @param {number} a float 0.0-1.0
	 * @return {Colors}
	 */
	setHSLA (h, s, l, a = this.hsla.A)
	{
		this._setHSLA (h, s, l, a);
		this._calcFromHSLA ();
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
	 *
	 * @return {string}
	 */
	toCSS_hex ()
	{
		return `#${ this.hexa.R }${ this.hexa.G }${ this.hexa.B }`;
	}


	/**
	 *
	 * @return {string}
	 */
	toCSS_hexA ()
	{
		return this.toCSS_hex () + this.hexa.A;
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
	 *
	 */
	_calcFromRGBA ()
	{
		this._setNormalized (
			this.rgba.R / 255,
			this.rgba.G / 255,
			this.rgba.B / 255,
			this.rgba.A / 255
		);

		this._setHexaFromRGBA (
			this.getRGBA ()
		);

		this._setHSLA (
			...Object.values (
				this._normalized2hsla (this.getNormalized ())
			)
		);
	}


	/**
	 *
	 */
	_calcFromHSLA ()
	{
		const normalized = this._hsla2normalized (this.hsla.H, this.hsla.S, this.hsla.L, this.hsla.A);

		this._setNormalized (
			normalized.R,
			normalized.G,
			normalized.B,
			normalized.A
		);

		this._setRGBA (
			this.normalized.R * 255,
			this.normalized.G * 255,
			this.normalized.B * 255,
			this.normalized.A * 255
		);

		this._setHexaFromRGBA (
			this.getRGBA ()
		);
	}


	/**
	 *
	 */
	_calcFromNormalized ()
	{
		this._setRGBA (
			this.normalized.R * 255,
			this.normalized.G * 255,
			this.normalized.B * 255,
			this.normalized.A * 255
		);

		this._setHexaFromRGBA (
			this.getRGBA ()
		);

		this._setHSLA (
			...Object.values (
				this._normalized2hsla (this.getNormalized ())
			)
		);
	}


	/**
	 *
	 */
	_calcFromHexa ()
	{
		this._setRGBA (
			parseInt (this.hexa.R, 16),
			parseInt (this.hexa.G, 16),
			parseInt (this.hexa.B, 16),
			parseInt (this.hexa.A, 16)
		);

		this._setNormalized (
			this.rgba.R / 255,
			this.rgba.G / 255,
			this.rgba.B / 255,
			this.rgba.A / 255
		);

		this._setHSLA (
			...Object.values (
				this._normalized2hsla (this.getNormalized ())
			)
		);
	}


	/**
	 * @param {number} r
	 * @param {number} g
	 * @param {number} b
	 * @param {number} a
	 * @private
	 */
	_setRGBA (r, g, b, a)
	{
		this.rgba = {
			R: this._colorClamp (r),
			G: this._colorClamp (g),
			B: this._colorClamp (b),
			A: this._colorClamp (a)
		};
	}


	/**
	 * @param {number} r int 0-255
	 * @param {number} g int 0-255
	 * @param {number} b int 0-255
	 * @param {number} a int 0-255
	 * @private
	 */
	_setNormalized (r, g, b, a)
	{
		this.normalized = {
			R: this._clamp (r, 0, 1),
			G: this._clamp (g, 0, 1),
			B: this._clamp (b, 0, 1),
			A: this._clamp (a, 0, 1)
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
	_setHexa (r, g, b, a)
	{
		this.hexa = {
			R: this._cleanHexa (r),
			G: this._cleanHexa (g),
			B: this._cleanHexa (b),
			A: this._cleanHexa (a)
		};
	}


	/**
	 * @param {iRGBA} rgba
	 * @return {iHEXA}
	 * @private
	 */
	_setHexaFromRGBA (rgba)
	{
		this.hexa = {
			R: this._dec2hex (rgba.R),
			G: this._dec2hex (rgba.G),
			B: this._dec2hex (rgba.B),
			A: this._dec2hex (rgba.A)
		};
	}


	/**
	 * @param {number} h float 0.0-360.0
	 * @param {number} s float 0.0-1.0
	 * @param {number} l float 0.0-1.0
	 * @param {number} a float 0.0-1.0
	 * @private
	 */
	_setHSLA (h, s, l, a)
	{
		this.hsla = {
			H: h % 360,
			S: this._clamp (s, 0, 1),
			L: this._clamp (l, 0, 1),
			A: this._clamp (a, 0, 1)
		};
	}


	/**
	 *
	 * @param {number} num int
	 * @returns {number}
	 * @private
	 */
	_colorClamp (num)
	{
		return this._clamp (Math.round (num), 0, 255);
	}


	/**
	 *
	 * @param {number} value
	 * @param {number} min
	 * @param {number} max
	 * @return {number}
	 * @private
	 */
	_clamp (value, min, max)
	{
		return Math.min (Math.max (value, min), max);
	}


	/**
	 *
	 * @param {number} v int
	 * @returns {string} "00"-"FF"
	 * @private
	 */
	_dec2hex (v)
	{
		return this._colorClamp (v).toString (16).padStart (2, "0").toUpperCase ();
	}


	/**
	 *
	 * @param {string} value
	 * @return {string}	"0F" -> "0F" (15), "F" -> "FF" (255)
	 * @private
	 */
	_cleanHexa (value)
	{
		const cleaned = value.replace (/[^0-9A-F]/ig, '').substring (0, 2).toUpperCase ();
		return cleaned.length === 1 ? cleaned + cleaned : cleaned;
	}


	/**
	 * @param {iNORMALIZED} normalized
	 * @return {iHSLA}
	 * @private
	 */
	_normalized2hsla (normalized)
	{
		const normR = normalized.R;
		const normG = normalized.G;
		const normB = normalized.B;
		const v = Math.max (normR, normG, normB);
		const c = v - Math.min (normR, normG, normB);
		const f = 1 - Math.abs (v + v - c - 1);
		const h = c
			&& (
				v === normR
				? ( normG - normB ) / c
				: v === normG
				  ? 2 + ( normB - normR ) / c
				  : 4 + ( normR - normG ) / c
			);

		return {
			H: 60 * ( h < 0 ? h + 6 : h ),
			S: ( f ? c / f : 0 ),
			L: ( ( v + v - c ) / 2 ),
			A: normalized.A
		};
	}


	/**
	 *
	 * @param {number} h float 0.0-360.0
	 * @param {number} s float 0.0-1.0
	 * @param {number} l float 0.0-1.0
	 * @param {number} a float 0.0-1.0
	 * @return {iNORMALIZED}
	 * @private
	 */
	_hsla2normalized (h, s, l, a)
	{
		const v = s * Math.min (l, 1 - l);
		const f = (n, k = ( n + h / 30 ) % 12) => l - v * Math.max (Math.min (k - 3, 9 - k, 1), -1);
		return {
			R: f (0),
			G: f (8),
			B: f (4),
			A: a
		};
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