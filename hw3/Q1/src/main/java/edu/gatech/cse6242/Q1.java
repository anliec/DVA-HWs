package edu.gatech.cse6242;

import java.io.IOException;
import java.util.StringTokenizer;

import org.apache.hadoop.fs.Path;
import org.apache.hadoop.conf.Configuration;
import org.apache.hadoop.io.*;
import org.apache.hadoop.mapreduce.*;
import org.apache.hadoop.util.*;
import org.apache.hadoop.mapreduce.lib.input.FileInputFormat;
import org.apache.hadoop.mapreduce.lib.output.FileOutputFormat;

public class Q1 {
    public static class TokenizerMapper extends Mapper<Object, Text, Text, IntWritable>
    {
      private final static IntWritable weight = new IntWritable();
      private Text source = new Text();
      private Text target = new Text();
      String edge = null;
      //Map function
      public void map(Object key, Text value, Context context) throws IOException, InterruptedException
      {
        String line = value.toString();
        StringTokenizer itr = new StringTokenizer(line,"\t");
        source.set(itr.nextToken());
        target.set(itr.nextToken());
        edge = itr.nextToken();
        if (edge != null){
            weight.set(Integer.parseInt(edge));
            context.write(target, weight);
        }
      }
    }

    public static class IntSumReducer extends Reducer<Text, IntWritable, Text, IntWritable>
    {
        private IntWritable result = new IntWritable();
        //Reduce function
        public void reduce(Text key, Iterable<IntWritable> values, Context context) throws IOException, InterruptedException
        {
            int sum = 0;
            for(IntWritable val : values)//iterate all the elements in values
            {
                sum += val.get();
            }
            result.set(sum);
            context.write(key, result);
        }
    }

  public static void main(String[] args) throws Exception {
    Configuration conf = new Configuration();
    Job job = Job.getInstance(conf, "Q1");

    /* TODO: Needs to be implemented */
    job.setJarByClass(Q1.class);
    job.setMapperClass(TokenizerMapper.class);
    job.setCombinerClass(IntMaxReducer.class);
    job.setReducerClass(IntMaxReducer.class);
    job.setOutputKeyClass(Text.class);
    job.setOutputValueClass(IntWritable.class);
    FileInputFormat.addInputPath(job, new Path(args[0]));
    FileOutputFormat.setOutputPath(job, new Path(args[1]));
    System.exit(job.waitForCompletion(true) ? 0 : 1);
  }
}
