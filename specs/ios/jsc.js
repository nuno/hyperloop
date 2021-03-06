if (process.platform !== 'darwin') return;

/**
 * ios buildlib tests
 */
var should = require('should'),
	path = require('path'),
	fs = require('fs'),
	temp = require('temp'),
	log = require('../../lib/log'),
	buildlib = require('../../lib/ios/buildlib'),
	settings;

log.level = 'quiet';

describe("jsc", function(){

	before(function(done){
		buildlib.getXcodeSettings(function(err,xcode){
			settings = xcode;
			done(err);
		});
	});

	it("should be able to compile",function(done){

		temp.mkdir('hltest', function(err, dirPath) {
			if (err) return done(err);

			var srcdir = path.join(dirPath,"src"),
				build = path.join(dirPath,"build");

			fs.mkdirSync(srcdir);
			fs.mkdirSync(build);

			// micro test that will run inside ios simulator
			//
			// everything inside this function will get compiled into the test app
			// and then execute inside the simulator with the results coming to the console
			//
			var js_test_src = (function(){

				// platform dependent, but these work for simulator
				var size_of_char     = 1;
				var size_of_bool     = 1;
				var size_of_short    = 2;
				var size_of_int      = 4;
				var size_of_float    = 4;
				var size_of_long     = 4;
				var size_of_double   = 8;
				var size_of_longlong = 8;

				// Grow to specific size
				var m = new JSBuffer();
				m.grow(10 * size_of_float);
				assert(m.length===(10 * size_of_float), "JSBuffer.grow(10) length was: "+m.length);

				// Grow float test
				m.putFloat(1.0, 10);
				assert(m.length===(11 * size_of_float), "JSBuffer.putFloat(1.0, 11) length was: "+m.length);

				// Grow float test
				m.putFloat(1.0, 15);
				assert(m.length===(16 * size_of_float), "JSBuffer.putFloat(1.0, 15) length was: "+m.length);

				// Grow int buffer
				m = new JSBuffer();
				m.growInt(10);
				assert(m.length===(10 * size_of_int), "JSBuffer.growInt(10) length was: "+m.length);

				// Grow float buffer
				m = new JSBuffer();
				m.growFloat(10);
				assert(m.length===(10 * size_of_float), "JSBuffer.growFloat(10) length was: "+m.length);

				// Grow double buffer
				m = new JSBuffer();
				m.growDouble(10);
				assert(m.length===(10 * size_of_double), "JSBuffer.growDouble(10) length was: "+m.length);

				// Grow short buffer
				m = new JSBuffer();
				m.growShort(10);
				assert(m.length===(10 * size_of_short), "JSBuffer.growShort(10) length was: "+m.length);

				// Grow long buffer
				m = new JSBuffer();
				m.growLong(10);
				assert(m.length===(10 * size_of_long), "JSBuffer.growLong(10) length was: "+m.length);

				// Grow long long buffer
				m = new JSBuffer();
				m.growLongLong(10);
				assert(m.length===(10 * size_of_longlong), "JSBuffer.growLongLong(10) length was: "+m.length);

				// Grow bool buffer
				m = new JSBuffer();
				m.growBool(10);
				assert(m.length===(10 * size_of_bool), "JSBuffer.growBool(10) length was: "+m.length);

				// Grow char buffer
				m = new JSBuffer();
				m.growChar(10);
				assert(m.length===(10 * size_of_char), "JSBuffer.growChar(10) length was: "+m.length);
				assert('function'===typeof(JSBuffer),"JSBuffer should have been an function, was: "+typeof(JSBuffer));

				var emptyBuffer = new JSBuffer();

				assert(emptyBuffer, "new JSBuffer should have been created");

				assert(typeof(emptyBuffer.length)==='number', "new JSBuffer should be of type number, was: "+typeof(emptyBuffer.length));

				assert(emptyBuffer.length===1, "new JSBuffer should have length of 1, was: "+emptyBuffer.length);

				assert(emptyBuffer.toString()==='[object JSBuffer]', "new JSBuffer toString should return [object JSBuffer], was: "+emptyBuffer.toString());

				assert(emptyBuffer.constructor=='[object JSBufferConstructor]', "emptyBuffer.constructor should return [object JSBufferConstructor], was: "+emptyBuffer.constructor);

				assert(emptyBuffer.constructor.name==='JSBuffer', "emptyBuffer.constructor.name should return JSBuffer, was: "+emptyBuffer.constructor.name);

				assert(JSBuffer.prototype!==undefined, "JSBuffer.prototype should not be undefined, was: "+JSBuffer.prototype);

				assert(JSBuffer.prototype.constructor.name==='JSBuffer', "JSBuffer.prototype.constructor.name should return JSBuffer, was: "+JSBuffer.prototype.constructor.name);

				assert(emptyBuffer.isNaN(), "emptyBuffer.isNaN() should be true, was: "+emptyBuffer.isNaN());

				assert(isNaN(emptyBuffer.NaN), "isNaN(emptyBuffer.NaN) should be true, was: "+isNaN(emptyBuffer.NaN));

				emptyBuffer.putInt(1);

				assert(emptyBuffer.toInt()===1, "emptyBuffer.toInt() should be 1, was: "+emptyBuffer.toInt());
				assert(emptyBuffer.toBool()===true, "emptyBuffer.toBool() should be true, was: "+emptyBuffer.toBool());

				emptyBuffer.putDouble(1);
				assert(emptyBuffer.toDouble()===1, "emptyBuffer.toDouble() should be 1, was: "+emptyBuffer.toDouble());

				emptyBuffer.putFloat(1);
				assert(emptyBuffer.toFloat()===1, "emptyBuffer.toFloat() should be 1, was: "+emptyBuffer.toFloat());

				emptyBuffer.putShort(1);
				assert(emptyBuffer.toShort()===1, "emptyBuffer.toShort() should be 1, was: "+emptyBuffer.toShort());

				emptyBuffer.putLong(1);
				assert(emptyBuffer.toLong()===1, "emptyBuffer.toLong() should be 1, was: "+emptyBuffer.toLong());

				emptyBuffer.putBool(true);
				assert(emptyBuffer.toBool()===true, "emptyBuffer.toBool() should be true, was: "+emptyBuffer.toBool());

				emptyBuffer.putBool(false);
				assert(emptyBuffer.toBool()===false, "emptyBuffer.toBool() should be false, was: "+emptyBuffer.toBool());

				emptyBuffer.putDouble(Number.MAX_VALUE);
				assert(emptyBuffer.toDouble()===Number.MAX_VALUE, "emptyBuffer.toDouble() should be "+Number.MAX_VALUE+", was: "+emptyBuffer.toDouble());

				emptyBuffer.putDouble(Number.MIN_VALUE);
				assert(emptyBuffer.toDouble()===Number.MIN_VALUE, "emptyBuffer.toDouble() should be "+Number.MIN_VALUE+", was: "+emptyBuffer.toDouble());

				emptyBuffer.putFloat(parseFloat("20.110000610351562"));
				assert(emptyBuffer.toFloat()===20.110000610351562, "emptyBuffer.toFloat() should be 20.110000610351562, was: "+emptyBuffer.toFloat());

				emptyBuffer.reset();
				// reset to int size as default with value as NaN
				assert(emptyBuffer.length===4, "emptyBuffer.reset() should have length of 4, was: "+emptyBuffer.length);

				emptyBuffer.putChar("a");
				assert(emptyBuffer.toChar()==="a", "emptyBuffer.toChar() should be a, was: "+emptyBuffer.toChar());

				emptyBuffer.putChar("b",1);
				assert(emptyBuffer.toChar(1)==="b", "emptyBuffer.toChar(1) should be b, was: "+emptyBuffer.toChar(1));
				assert(emptyBuffer.toChar(0)==="a", "emptyBuffer.toChar(0) should be a, was: "+emptyBuffer.toChar(0));
				assert(emptyBuffer.length===4, "emptyBuffer.length should have length of 4, was: "+emptyBuffer.length);
				assert(emptyBuffer.toCharArray()=="ab", "emptyBuffer.toCharArray() should be ab, was: "+emptyBuffer.toCharArray());

				emptyBuffer.putDouble(0);
				emptyBuffer.putDouble(1,1);
				assert(emptyBuffer.toDouble(1)===1, "emptyBuffer.toDouble(1) should be 1, was: "+emptyBuffer.toDouble(1));

				emptyBuffer.putFloat(0);
				emptyBuffer.putFloat(9,1);
				assert(emptyBuffer.toFloat(1)===9, "emptyBuffer.toFloat(1) should be 9, was: "+emptyBuffer.toFloat(1));

				emptyBuffer.putLong(0);
				emptyBuffer.putLong(8,1);
				assert(emptyBuffer.toLong(1)===8, "emptyBuffer.toLong(1) should be 8, was: "+emptyBuffer.toLong(1));

				emptyBuffer.putShort(0);
				emptyBuffer.putShort(7,1);
				assert(emptyBuffer.toShort(1)===7, "emptyBuffer.toShort(1) should be 7, was: "+emptyBuffer.toShort(1));

				var dupBuffer = emptyBuffer.duplicate();
				assert(dupBuffer.toShort(1)===7, "dupBuffer.toShort(1) should be 7, was: "+dupBuffer.toShort(1));

				dupBuffer.release();
				assert(dupBuffer.length===undefined, "dupBuffer.length should be undefined, was: "+dupBuffer.length);

				var shortArray = emptyBuffer.toShortArray();
				assert(shortArray.constructor.name===Array.prototype.constructor.name, "shortArray.constructor.name should be "+Array.prototype.constructor.name+", was: "+shortArray.constructor.name);
				assert(shortArray.length, "shortArray.length should be 2, was: "+shortArray.length);
				assert(shortArray[0]===0, "shortArray[0] should be 0, was: "+shortArray[0]);
				assert(shortArray[1]===7, "shortArray[1] should be 7, was: "+shortArray[1]);

				var sliceBuf = emptyBuffer.slice(0,1);
				assert(sliceBuf.length, "sliceBuf.length should be 1, was: "+sliceBuf.length);
				assert(sliceBuf.toShort()===0, "sliceBuf.toShort() should be 0, was: "+sliceBuf.toShort());

				assert(typeof(sliceBuf.SIZE_OF_CHAR)==='number',"SIZE_OF_CHAR should be defined as number, was: "+typeof(sliceBuf.SIZE_OF_CHAR));
				assert(typeof(sliceBuf.SIZE_OF_LONG)==='number',"SIZE_OF_LONG should be defined as number, was: "+typeof(sliceBuf.SIZE_OF_LONG));
				assert(typeof(sliceBuf.SIZE_OF_INT)==='number',"SIZE_OF_INT should be defined as number, was: "+typeof(sliceBuf.SIZE_OF_INT));
				assert(typeof(sliceBuf.SIZE_OF_SHORT)==='number',"SIZE_OF_SHORT should be defined as number, was: "+typeof(sliceBuf.SIZE_OF_SHORT));
				assert(typeof(sliceBuf.SIZE_OF_FLOAT)==='number',"SIZE_OF_FLOAT should be defined as number, was: "+typeof(sliceBuf.SIZE_OF_FLOAT));
				assert(typeof(sliceBuf.SIZE_OF_DOUBLE)==='number',"SIZE_OF_DOUBLE should be defined as number, was: "+typeof(sliceBuf.SIZE_OF_DOUBLE));

				// this are OS architecture dependent but in general we're running the simulator in 32-bit mode so these match those
				assert(sliceBuf.SIZE_OF_CHAR===1,"SIZE_OF_CHAR should be 1, was: "+sliceBuf.SIZE_OF_CHAR);
				assert(sliceBuf.SIZE_OF_SHORT===2,"SIZE_OF_CHAR should be 2, was: "+sliceBuf.SIZE_OF_SHORT);
				assert(sliceBuf.SIZE_OF_INT===4,"SIZE_OF_INT should be 4, was: "+sliceBuf.SIZE_OF_INT);
				assert(sliceBuf.SIZE_OF_FLOAT===4,"SIZE_OF_FLOAT should be 4, was: "+sliceBuf.SIZE_OF_FLOAT);
				assert(sliceBuf.SIZE_OF_LONG===4,"SIZE_OF_LONG should be 4, was: "+sliceBuf.SIZE_OF_LONG);
				assert(sliceBuf.SIZE_OF_DOUBLE===8,"SIZE_OF_DOUBLE should be 8, was: "+sliceBuf.SIZE_OF_DOUBLE);

				var unicode = new JSBuffer();
				unicode.putString("こんにちは世界");
				assert(unicode.length===21,"こんにちは世界 length should be 21, was: "+unicode.length);

				// put int array
				m = new JSBuffer();
				m.putInt([2, 5, 8]);
				assert(m.length===(3 * size_of_int), "putInt([]) length was:"+m.length);
				assert(m.toInt(0) == 2, "JSBuffer.toInt(0) should be 2, was: "+m.toInt(0));
				assert(m.toInt(1) == 5, "JSBuffer.toInt(1) should be 5, was: "+m.toInt(1));
				assert(m.toInt(2) == 8, "JSBuffer.toInt(2) should be 8, was: "+m.toInt(2));

				// put float array
				m = new JSBuffer();
				m.putFloat([0.5, 1.0, 1.5]);
				assert(m.length===(3 * size_of_float), "JSBuffer.putFloat([]) was: "+m.length);
				assert(m.toFloat(0) == 0.5, "JSBuffer.toFloat(0) should be 0.5, was: "+m.toFloat(0));
				assert(m.toFloat(1) == 1.0, "JSBuffer.toFloat(1) should be 1.0, was: "+m.toFloat(1));
				assert(m.toFloat(2) == 1.5, "JSBuffer.toFloat(2) should be 1.5, was: "+m.toFloat(2));

				// add float array from given index
				m.putFloat([20.110000610351562, 20], 3);
				assert(m.length===(5 * size_of_float), "JSBuffer.putFloat([]) was: "+m.length);
				assert(m.toFloat(0) == 0.5, "JSBuffer.toFloat(0) "+m.toFloat(0));
				assert(m.toFloat(1) == 1.0, "JSBuffer.toFloat(1) "+m.toFloat(1));
				assert(m.toFloat(2) == 1.5, "JSBuffer.toFloat(2) "+m.toFloat(2));
				assert(m.toFloat(3) == 20.110000610351562, "JSBuffer.toFloat(3) "+m.toFloat(3));
				assert(m.toFloat(4) == 20, "JSBuffer.toFloat(4) "+m.toFloat(4));

				m = new JSBuffer();
				m.putDouble([20.110000610351562, Number.MAX_VALUE]);
				assert(m.length===(2 * size_of_double), "JSBuffer.putDouble([]) length was: "+m.length);
				assert(m.toDouble(0) == 20.110000610351562, "JSBuffer.toDouble(0) "+m.toFloat(0));
				assert(m.toDouble(1) == Number.MAX_VALUE, "JSBuffer.toDouble(1) "+m.toFloat(1));

				m = new JSBuffer();
				m.putShort([1, 2]);
				assert(m.length===(2 * size_of_short), "JSBuffer.putShort([]) length was: "+m.length);
				assert(m.toShort(0) == 1, "JSBuffer.toShort(0) "+m.toShort(0));
				assert(m.toShort(1) == 2, "JSBuffer.toShort(1) "+m.toShort(1));

				m = new JSBuffer();
				m.putLong([1, 2]);
				assert(m.length===(2 * size_of_long), "JSBuffer.putLong([]) length was: "+m.length);
				assert(m.toLong(0) == 1, "JSBuffer.toLong(0) "+m.toLong(0));
				assert(m.toLong(1) == 2, "JSBuffer.toLong(1) "+m.toLong(1));

				m = new JSBuffer();
				m.putBool([true, false, false, true]);
				assert(m.toBool(0) == true, "JSBuffer.toBool(0) "+m.toBool(0));
				assert(m.toBool(1) == false, "JSBuffer.toBool(1) "+m.toBool(1));
				assert(m.toBool(2) == false, "JSBuffer.toBool(2) "+m.toBool(2));
				assert(m.toBool(3) == true, "JSBuffer.toBool(3) "+m.toBool(3));

				m = new JSBuffer();
				m.putChar(['a', 'z', '1', 'c']);
				assert(m.toChar(0) == 'a', "JSBuffer.toChar(0) "+m.toChar(0));
				assert(m.toChar(1) == 'z', "JSBuffer.toChar(1) "+m.toChar(1));
				assert(m.toChar(2) == '1', "JSBuffer.toChar(2) "+m.toChar(2));
				assert(m.toChar(3) == 'c', "JSBuffer.toChar(3) "+m.toChar(3));

			}).toString().trim().replace(/^function \(\){/,'').replace(/}$/,'').replace(/[\n]/g,'\\n').replace(/"/g,'\\"').trim();

			// write out source file and replace token with actually source
			fs.writeFileSync(path.join(srcdir,"jsc_test.m"),fs.readFileSync(path.join(__dirname,"src","jsc_test.m")).toString().replace("JS_TEST_SRC",js_test_src));

			var headerPath = path.join(__dirname,"../../lib/ios/jsc/templates/source"),
				sourceFiles = fs.readdirSync(headerPath).filter(function(f){return (f.indexOf('.h')==-1)}).map(function(f){return path.join(headerPath,f)}),
				options = {
					minVersion : "7.0",
					libname: "libjsc_test.a",
					srcfiles: sourceFiles.concat([path.join(srcdir,"jsc_test.m")]),
					outdir: build,
					cflags: ["-I"+headerPath],
					linkflags: ['-framework JavaScriptCore'],
					name: 'jsc_test',
					appid: 'org.appcelerator.jsc_test',
					dest: build,
					debug: true,
					launch: true,
					no_arc: true,
					hide: true,
					classprefix: 'hl$'
				},
				failures = 0,
				failureRegex = /^FAIL:/;

			options.logger = {
				info: function(line) {
					line && console.log(line);
					if (failures===0 && failureRegex.test(line)) {
						failures++;
						return done(new Error(line));
					}
				},
				debug: function(line) {
					line && line==='EXIT' && failures === 0 && done();
				},
				error: function(line) {
					if (line && failures===0) {
						failures++;
						return done(new Error(line));
					}
				}
			}
			buildlib.compileAndMakeStaticLib(options, function(err,results){
				if (err) return done(err);
				var Packager = require(path.join(__dirname,'../../lib/ios','packager.js')).Packager;
				var packager = new Packager(options);
				packager.package(options,['--launch'],function(err){
					if (err) return done(err);
				});
			});
		});

	});
});