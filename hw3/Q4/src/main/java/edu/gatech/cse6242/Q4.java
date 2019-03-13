package edu.gatech.cse6242;

import java.util.StringTokenizer;
import java.io.File;

import org.apache.hadoop.fs.Path;
import org.apache.hadoop.conf.Configuration;
import org.apache.hadoop.io.*;
import org.apache.hadoop.mapreduce.*;
import org.apache.hadoop.util.*;
import org.apache.hadoop.mapreduce.lib.input.FileInputFormat;
import org.apache.hadoop.mapreduce.lib.output.FileOutputFormat;
import org.apache.hadoop.mapred.FileAlreadyExistsException;

import java.io.IOException;

public class Q4 {
    public static class TokenizerMapper
            extends Mapper<Object, Text, Text, IntWritable> {

        private final static IntWritable one = new IntWritable(1);
        private final static IntWritable minusOne = new IntWritable(-1);
        private Text node = new Text();

        public void map(Object key, Text value, Context context) throws IOException, InterruptedException {
            String line = value.toString();
            StringTokenizer itr = new StringTokenizer(line,"\t");
            node.set(itr.nextToken());
            context.write(node, one);
            node.set(itr.nextToken());
            context.write(node, minusOne);
        }
    }

    public static class IntSumReducer
            extends Reducer<Text, IntWritable, Text, IntWritable> {
        private IntWritable result = new IntWritable();

        public void reduce(Text key, Iterable<IntWritable> values,
                           Context context
        ) throws IOException, InterruptedException {
            int sum = 0;
            for (IntWritable val : values) {
                sum += val.get();
            }
            result.set(sum);
            context.write(key, result);
        }
    }

    public static class TokenizerMapper2
            extends Mapper<Object, Text, Text, IntWritable> {

        private Text value = new Text();
        private final static IntWritable one = new IntWritable(1);

        public void map(Object key, Text value, Context context) throws IOException, InterruptedException {
            String line = value.toString();
            StringTokenizer itr = new StringTokenizer(line,"\t");
            itr.nextToken();
            value.set(itr.nextToken());
            context.write(value, one);
        }
    }

    public static void main(String[] args) throws Exception {
        Configuration conf1 = new Configuration();
        Job job1 = Job.getInstance(conf1, "Q4");
        Configuration conf2 = new Configuration();
        Job job2 = Job.getInstance(conf2, "Q4");
        
        /* TODO: Needs to be implemented */
        job1.setJarByClass(Q4.class);
        job1.setMapperClass(TokenizerMapper.class);
        job1.setCombinerClass(IntSumReducer.class);
        job1.setReducerClass(IntSumReducer.class);
        job1.setOutputKeyClass(Text.class);
        job1.setOutputValueClass(IntWritable.class);

        job2.setJarByClass(Q4.class);
        job2.setMapperClass(TokenizerMapper2.class);
        job2.setCombinerClass(IntSumReducer.class);
        job2.setReducerClass(IntSumReducer.class);
        job2.setOutputKeyClass(Text.class);
        job2.setOutputValueClass(IntWritable.class);

        int t = 0;
        do {
            t++;
            File f = new File("tmp" + t);
        }while (f.exists());

        FileInputFormat.setInputPaths(job1, new Path(args[0]));
        FileOutputFormat.setOutputPath(job1, new Path("tmp" + t));
        FileInputFormat.setInputPaths(job2, new Path("tmp" + t));
        FileOutputFormat.setOutputPath(job2, new Path(args[1]));
        System.exit(job1.waitForCompletion(true) ? (job2.waitForCompletion(true) ? 0 : 1) : 1);
        }
    }
}
