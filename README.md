# sample pulsar cpp and node client

## CPP client

Instructions how to build a simple producer, consumer and reader with precompiled/installed pulsar library.

Download RPM or DEB packages from [Apache distribution archive](https://archive.apache.org/dist/pulsar/) Both pulsar-client and pulsar-client-dev packages are required.

`c++` version tested on Centos 7.3
```
$ c++ -v
Using built-in specs.
COLLECT_GCC=c++
COLLECT_LTO_WRAPPER=/usr/libexec/gcc/x86_64-redhat-linux/4.8.5/lto-wrapper
Target: x86_64-redhat-linux
Configured with: ../configure --prefix=/usr --mandir=/usr/share/man --infodir=/usr/share/info --with-bugurl=http://bugzilla.redhat.com/bugzilla --enable-bootstrap --enable-shared --enable-threads=posix --enable-checking=release --with-system-zlib --enable-__cxa_atexit --disable-libunwind-exceptions --enable-gnu-unique-object --enable-linker-build-id --with-linker-hash-style=gnu --enable-languages=c,c++,objc,obj-c++,java,fortran,ada,go,lto --enable-plugin --enable-initfini-array --disable-libgcj --with-isl=/builddir/build/BUILD/gcc-4.8.5-20150702/obj-x86_64-redhat-linux/isl-install --with-cloog=/builddir/build/BUILD/gcc-4.8.5-20150702/obj-x86_64-redhat-linux/cloog-install --enable-gnu-indirect-function --with-tune=generic --with-arch_32=x86-64 --build=x86_64-redhat-linux
Thread model: posix
gcc version 4.8.5 20150623 (Red Hat 4.8.5-39) (GCC)

```

`c++` version tested on Ubuntu 16.04
```
$ c++ -v
Using built-in specs.
COLLECT_GCC=c++
COLLECT_LTO_WRAPPER=/usr/lib/gcc/x86_64-linux-gnu/5/lto-wrapper
Target: x86_64-linux-gnu
Configured with: ../src/configure -v --with-pkgversion='Ubuntu 5.4.0-6ubuntu1~16.04.12' --with-bugurl=file:///usr/share/doc/gcc-5/README.Bugs --enable-languages=c,ada,c++,java,go,d,fortran,objc,obj-c++ --prefix=/usr --program-suffix=-5 --enable-shared --enable-linker-build-id --libexecdir=/usr/lib --without-included-gettext --enable-threads=posix --libdir=/usr/lib --enable-nls --with-sysroot=/ --enable-clocale=gnu --enable-libstdcxx-debug --enable-libstdcxx-time=yes --with-default-libstdcxx-abi=new --enable-gnu-unique-object --disable-vtable-verify --enable-libmpx --enable-plugin --with-system-zlib --disable-browser-plugin --enable-java-awt=gtk --enable-gtk-cairo --with-java-home=/usr/lib/jvm/java-1.5.0-gcj-5-amd64/jre --enable-java-home --with-jvm-root-dir=/usr/lib/jvm/java-1.5.0-gcj-5-amd64 --with-jvm-jar-dir=/usr/lib/jvm-exports/java-1.5.0-gcj-5-amd64 --with-arch-directory=amd64 --with-ecj-jar=/usr/share/java/eclipse-ecj.jar --enable-objc-gc --enable-multiarch --disable-werror --with-arch-32=i686 --with-abi=m64 --with-multilib-list=m32,m64,mx32 --enable-multilib --with-tune=generic --enable-checking=release --build=x86_64-linux-gnu --host=x86_64-linux-gnu --target=x86_64-linux-gnu
Thread model: posix
gcc version 5.4.0 20160609 (Ubuntu 5.4.0-6ubuntu1~16.04.12)

```

To compile
```
$ c++ -std=gnu++11 -o consumer consumer.cc -L/usr/include -lpulsar
$ c++ -std=gnu++11 -o producer producer.cc -L/usr/include -lpulsar
$ c++ -std=gnu++11 -o reader reader.cc -L/usr/include -lpulsar
```

Sample code of [consumer, producer, and reader](./cpp)

## Node client

Apache Pulsar Node.js sample clients

Since Node.js library depends on Pulsar C++ library, please install C++ library as prerequisite. Download RPM or DEB packages from [Apache distribution archive](https://archive.apache.org/dist/pulsar/) Both pulsar-client and pulsar-client-dev packages are required. Current Pulsar Node.js depends on C++ version 2.4 and higher.

## Node Websocket

Websocket client does not have C++ library dependency.

[Websocket sample clients](./src/ws)
